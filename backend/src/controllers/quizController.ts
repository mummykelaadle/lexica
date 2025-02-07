import WordHistory from "../models/wordHistory";
import Word from "../models/wordModel";
import { Request, Response, NextFunction } from 'express';
import SpacedRepetitionHistory from "../models/SpacedRepetitionHistory ";
const generateQuiz = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.query.userId; // Get userId from query parameter
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Fetch the user's word history using the userId
    const wordHistory = await WordHistory.findOne({ userId }).populate("wordEntries.wordId");

    if (!wordHistory || wordHistory.wordEntries.length === 0) {
      return res.status(404).json({
        error: "No word history found. Please start adding words to your history."
      });
    }

       // Check if there are not enough words (less than 3) to generate the quiz
       if (wordHistory.wordEntries.length < 4) {
        return res.status(202).json({ //202 indicates that a request has been accepted for processing but has not yet been completed
          message: "Not enough word history to generate a quiz. Add more words and try again."
        });
      }


    // Generate quiz questions from the word history
    const questions = await Promise.all(
      wordHistory.wordEntries.map(async ({ wordId }) => {
        const word = await Word.findById(wordId);

        if (!word) {
          return null;
        }

        if (!word.meanings || word.meanings.length === 0) {
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


const generateSpacedRepetitionQuiz = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Fetch spaced repetition history words with mistakes
    const spacedRepetitionWords = await SpacedRepetitionHistory.find({ userId })
      .populate("wordId")
      .sort({ mistakeCount: -1, lastTestedAt: 1 }); // Sort by mistake count (descending), then by last tested date

    // If no spaced repetition words, return an empty response
    if (!spacedRepetitionWords || spacedRepetitionWords.length === 0) {
      return res.status(404).json({ message: "No words to test, please answer some questions first." });
    }

    let selectedWords: { id: string; text: string; options: string[]; correctAnswer: string }[] = [];
    let startIndex = 0;
    const maxQuestions = 10;

    // Loop until we have at least 10 valid questions
    while (selectedWords.length < maxQuestions && startIndex < spacedRepetitionWords.length) {
      // Get the next set of words
      const wordsToProcess = spacedRepetitionWords.slice(startIndex, startIndex + maxQuestions - selectedWords.length);
      startIndex += wordsToProcess.length;

      // Generate quiz questions for the selected words
      const questions = await Promise.all(
        wordsToProcess.map(async (entry) => {
          const word = await Word.findById(entry.wordId);
          if (!word || !word.meanings || word.meanings.length === 0) return null; // Only proceed if the word has meanings
          const correctMeaning = word.meanings[0];
          const incorrectOptions = await generateIncorrectOptions(correctMeaning, word.word);
          const options = fisherYatesShuffle([correctMeaning, ...incorrectOptions]);

          return {
            id: (word._id as string).toString(),
            text: `What is the meaning of '${word.word}'?`,
            options,
            correctAnswer: correctMeaning,
          };
        })
      );

      // Filter out any null or invalid questions (i.e., those with no meanings)
      const validQuestions = questions.filter((question) => question !== null);

      // Add valid questions to selectedWords
      selectedWords = selectedWords.concat(validQuestions);
    }

    // If there are not enough valid questions, return a message
    if (selectedWords.length === 0) {
      return res.status(200).json({ message: "Not enough valid questions available." });
    }

    // Limit the number of valid questions to a maximum of 10
    res.json(selectedWords.slice(0, 10));
  } catch (error) {
    console.error("Error generating spaced repetition quiz:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleSpacedRepetitionResult = async (req: Request, res: Response) => {
  try {
    const { userId, results } = req.body;

    for (const result of results) {
      const { wordId, isCorrect } = result;

      if (isCorrect) {
        // If correct, remove from spaced repetition history
        await SpacedRepetitionHistory.deleteOne({ userId, wordId });
      } else {
        // If incorrect, increment mistake count or create new entry
        const existingRecord = await SpacedRepetitionHistory.findOne({ userId, wordId });
        if (existingRecord) {
          existingRecord.mistakeCount += 1;
          existingRecord.lastTestedAt = new Date();
          await existingRecord.save();
        } else {
          await SpacedRepetitionHistory.create({ userId, wordId, mistakeCount: 1, lastTestedAt: new Date() });
        }
      }
    }

    res.json({ message: "Spaced repetition results processed successfully" });
  } catch (error) {
    console.error("Error handling spaced repetition result:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Helper function for incorrect options (same as your original code)
async function generateIncorrectOptions(correctMeaning: string, word: string): Promise<string[]> {
  try {
    const randomWords = await Word.aggregate([
      { $match: { word: { $ne: word }, meanings: { $exists: true, $not: { $size: 0 } } } },
      { $sample: { size: 3 } },
      { $project: { meanings: { $slice: ["$meanings", 1] } } },
    ]);
    return randomWords.map((w) => w.meanings[0] || "Unknown");
  } catch (error) {
    console.error("Error generating incorrect options:", error);
    return ["Oops, no meaning found!", "Hmm... meaning lost in translation", "Looks like this one's a mystery!"];
  }
}



export default { generateQuiz ,generateSpacedRepetitionQuiz ,handleSpacedRepetitionResult};
