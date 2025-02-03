import { Request, Response } from 'express';
import WordHistory from "../models/wordHistory";
import { getAuth } from '@clerk/express'
import logger from '../utils/logger';

const addWordToHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { wordId } = req.body;
    const { userId } = getAuth(req); // Get userId from Clerk

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (!wordId) {
      res.status(400).json({ message: "wordId is required" });
      return;
    }

    const timestamp = new Date();

    // Add the word along with its timestamp
    const wordHistory = await WordHistory.findOneAndUpdate(
      { userId },
      {
        $addToSet: { wordEntries: { wordId, addedAt: timestamp } }, // Add new entry only if it doesn’t already exist
        $setOnInsert: { createdAt: timestamp },
      },
      { upsert: true, new: true, returnDocument: "after" }
    );

    res.status(200).json({ message: "Word added to history", wordHistory });
  } catch (error) {
    logger.error("Error adding word to history:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getWordHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = getAuth(req); // Get userId from Clerk

    const wordHistory = await WordHistory.findOne({ userId })
      .populate("wordEntries.wordId")
      .lean();

    if (!wordHistory) {
      res.status(404).json({ message: "No word history found for this user." });
      return;
    }

    res.status(200).json(wordHistory);
  } catch (error) {
    logger.error("Error fetching word history:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default { addWordToHistory, getWordHistory };
