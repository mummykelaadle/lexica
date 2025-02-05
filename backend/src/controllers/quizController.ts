import WordHistory from "../models/wordHistory";
import Word from "../models/wordModel";
import { Request, Response, NextFunction } from 'express';

const generateQuiz = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.query.userId; // Get userId from query parameter
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Fetch the user's word history using the userId
    const wordHistory = await WordHistory.findOne({ userId }).populate("wordEntries.wordId");

    if (!wordHistory || wordHistory.wordEntries.length === 0) {
      return res.status(404).json({ error: "No word history found for this user" });
    }

    // Generate quiz questions from the word history
    const questions = await Promise.all(
      wordHistory.wordEntries.map(async ({ wordId }) => {
        const word = await Word.findById(wordId);

        if (!word) {
          console.warn(`No word found for wordId: ${wordId}`);
          return null;
        }

        if (!word.meanings || word.meanings.length === 0) {
          console.warn(`No meanings found for wordId: ${wordId}`);
          return null;
        }

        const correctMeaning = word.meanings[0]; // Assume the first meaning is correct
        const incorrectOptions = await generateIncorrectOptions(correctMeaning, word.word);

        const options = fisherYatesShuffle([correctMeaning, ...incorrectOptions]);

        return {
          id: wordId._id,
          text: `What is the meaning of '${word.word}'?`,
          options,
          correctAnswer: correctMeaning,
        };
      })
    );

    // Filter out null values and send the valid questions
    const validQuestions = questions.filter(Boolean);

    // Limit the number of questions to 10 if there are more than 10
    const maxQuestions = 10;
    const selectedQuestions = validQuestions.length <= maxQuestions ? validQuestions : fisherYatesShuffle(validQuestions).slice(0, maxQuestions);

    res.json(selectedQuestions);
  } catch (error) {
    console.error("Error generating quiz questions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Helper function to shuffle an array using Fisher-Yates algorithm
function fisherYatesShuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

// Generate incorrect options dynamically
async function generateIncorrectOptions(correctMeaning: string, word: string): Promise<string[]> {
  try {
    // Fetch 3 random words (excluding the given word) with their meanings
    const randomWords = await Word.aggregate([
      { $match: { word: { $ne: word } } }, // Exclude the correct word
      { $sample: { size: 3 } }, // Get 3 random words
      { $project: { meanings: { $slice: ["$meanings", 1] } } }, // Take only the first meaning
    ]);

    return randomWords.map(w => w.meanings[0] || "Unknown");
  } catch (error) {
    console.error("Error generating incorrect options:", error);
    return ["Oops, no meaning found!", "Hmm... meaning lost in translation", "Looks like this one's a mystery!"];

  }
}

export default { generateQuiz };
