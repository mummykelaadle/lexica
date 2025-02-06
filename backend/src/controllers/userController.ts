import { Request, Response } from 'express';
import WordHistory from "../models/wordHistory";
import { getAuth } from '@clerk/express'
import logger from '../utils/logger';

import FavouriteWord from "../models/favouriteWord";
import mongoose from "mongoose";

const addWordToHistory = async (req: Request, res: Response): Promise<void> => {
    try {
      const { wordId } = req.body;
      const { userId } = getAuth(req); // Get userId from Clerk
  
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });// if the userId doesn't exist
        return;
      }
  
      if (!wordId) {
        res.status(400).json({ message: "wordId is required" });// if wordId is missing
        return;
      }
  
      const timestamp = new Date();// create a timestamp
  
      // Add the word along with its timestamp
      const wordHistory = await WordHistory.findOneAndUpdate(
        { userId },// find a wordHistory with specified userId
        {
          $addToSet: { wordEntries: { wordId, addedAt: timestamp } }, // Add new entry only if it doesn’t already exist
          $setOnInsert: { createdAt: timestamp },
        },
        { upsert: true, new: true, returnDocument: "after" }// upsert -> create a doc if one doesn' exist
      );
  
      res.status(200).json({ message: "Word added to history", wordHistory });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error", error });
    }
};

const getWordHistory = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = getAuth(req); // Get userId from Clerk
        
        const wordHistory = await WordHistory.findOne({ userId })// find word history of the specified user
            .populate("wordEntries.wordId")// replace the reference of word with actual objects in the array
            .lean();// actual objects should be json not moongoose documents

        if (!wordHistory) {
            res.status(404).json({ message: "No word history found for this user." });
            return;
        }

        res.status(200).json(wordHistory);
    } catch (error) {
        console.error("Error fetching word history:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const isValidObjectId = (id: string) => mongoose.isValidObjectId(id);

const addWordToFavorites = async (req: Request, res: Response): Promise<void> => { 
  try {
    const { wordId } = req.body;
    const { userId } = getAuth(req);

    logger.log("🔹 Received wordId:", wordId);
    logger.log("🔹 Authenticated userId:", userId);

    if (!userId) {
      console.warn("❌ No userId found!");
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (!wordId || !isValidObjectId(wordId)) {
      console.warn("❌ Invalid wordId:", wordId);
      res.status(400).json({ message: "Invalid wordId" });
      return 
    }

    const timestamp = new Date();
    const favouriteWord = await FavouriteWord.findOneAndUpdate(
      { userId },
      {
        $addToSet: { wordEntries: { wordId: new mongoose.Types.ObjectId(wordId), addedAt: timestamp } },
        $setOnInsert: { createdAt: timestamp },
      },
      { upsert: true, new: true, returnDocument: "after" }
    );

    console.log("✅ Word added to favorites:", favouriteWord);
    res.status(200).json({ message: "Word added to favorites", favouriteWord });
    return 
  } catch (error) {
    console.error("❌ Error adding word to favorites:", error);
     res.status(500).json({ message: "Internal server error", error });
     return 
  }
};

const getFavouriteWords = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
       res.status(401).json({ message: "Unauthorized" });
       return 
    }

    const favouriteWords = await FavouriteWord.findOne({ userId })
      .populate("wordEntries.wordId")
      .lean();

    if (!favouriteWords || !favouriteWords.wordEntries?.length) {
       res.status(404).json({ message: "No favorite words found for this user." });
       return ;
    }

     res.status(200).json(favouriteWords);
     return 
  } catch (error) {
    console.error("Error fetching favorite words:", error);
     res.status(500).json({ message: "Internal Server Error" });
     return
  }
};

const removeWordFromFavorites = async (req: Request, res: Response): Promise<void> => {
  try {
    const { wordId } = req.params;
    const { userId } = getAuth(req);

    if (!userId) {
       res.status(401).json({ message: "Unauthorized" });
       return
    }

    if (!isValidObjectId(wordId)) {
       res.status(400).json({ message: "Invalid wordId" });
       return;
    }

    const updatedFavorite = await FavouriteWord.findOneAndUpdate(
      { userId },
      { $pull: { wordEntries: { wordId: new mongoose.Types.ObjectId(wordId) } } },
      { new: true }
    );

     res.status(200).json({ message: "Word removed from favorites", updatedFavorite });
     return;
  } catch (error) {
    console.error(error);
     res.status(500).json({ message: "Internal Server Error", error });
     return;
  }
};

const isWordFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const { wordId } = req.params;
    const { userId } = getAuth(req);

    if (!userId) {
       res.status(401).json({ message: "Unauthorized" });
       return;
    }

    if (!isValidObjectId(wordId)) {
       res.status(400).json({ message: "Invalid wordId" });
       return;
    }

    // 🔍 Find if word is inside the wordEntries array
    const isFavorite = !!(await FavouriteWord.findOne({
      userId,
      "wordEntries.wordId": new mongoose.Types.ObjectId(wordId),
    }));

     res.status(200).json({ isFavorite });
     return;
  } catch (error) {
    console.error("Error checking favorite status:", error);
     res.status(500).json({ message: "Internal Server Error" });
     return
  }
};


export default { addWordToHistory, getWordHistory, addWordToFavorites, getFavouriteWords, removeWordFromFavorites, isWordFavorite };
