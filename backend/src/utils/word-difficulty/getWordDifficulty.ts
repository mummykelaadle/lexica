import { syllable } from "syllable";
import { aoaData } from "./readAoAData";
import { concretenessData } from "./readConcretenessData";
import { getDifficultInstance } from "./difficult";
import { Difficulty } from "difficulty";

async function calculateDifficulty(word: string): Promise<number> {
  const difficult = await getDifficultInstance();
  return difficult.getDifficulty(word);
}

function countSyllables(word: string) {
  return syllable(word);
}

function getSemanticComplexity(word: string) {
  const concreteness = concretenessData[word.toLowerCase()] || 3.0;
  return 5 - concreteness;
}

function getWordAOA(word: string) {
  const wordData = aoaData.find(item => item.Word.toLowerCase() === word.toLowerCase());

  // Get the AoA score; default to a high value if the word is not found
  const AoAScore = wordData ? wordData.AOA : 15; // Default AoA = 15 for unknown words
  return AoAScore;
}

async function calculateWordDifficulty(word: string,difficulty:Difficulty) {
  const syllableCount = countSyllables(word);
  const diffLevel = difficulty.getLevel(word);
  const AoAScore = getWordAOA(word);
  const semanticComplexity = getSemanticComplexity(word);

  // Normalize AoA to a 0-1 scale
  const normalizedAoA = (AoAScore - 2.31) / (17.44 - 2.31);

  // Normalize syllable count (example: assume max ~6 for practical use)
  const normalizedSyllables = Math.min(syllableCount / 6, 1);

  // Normalize difficulty level (0-5 scale, just divide by 5)
  const normalizedDiffLevel = diffLevel / 5;

  // Normalize semantic complexity (already 0-5 scale, so divide by 5)
  const normalizedSemantics = semanticComplexity / 5;

  // Weighted sum (weights can be tuned)
  const difficultyScore =
    0.1 * normalizedAoA +
    0.15 * normalizedSyllables +
    0.6 * normalizedDiffLevel +
    0.15 * normalizedSemantics;

  const finalScore = Math.min(difficultyScore, 1);
  const scoreString: string = finalScore.toFixed(2);
  return parseFloat(scoreString);
}

export { calculateWordDifficulty };
