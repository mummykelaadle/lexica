import { Request, Response } from 'express';
import WordHistory from "../models/wordHistory";
import { getAuth } from '@clerk/express'
import logger from '../utils/logger';

import FavouriteWord from "../models/favouriteWord";
import mongoose from "mongoose";
import Book from '../models/bookModel';
import OnboardingTest from '../models/onBoardingTest';

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

const getBooksByUserId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = getAuth(req); // Get userId from Clerk
    logger.info(`fetching all books for userId:${userId}`)
    const books = await Book.find({ ownerId: userId }).select("_id title");

    // Map over books to return an array of book objects with id and title
    const bookList = books.map(book => ({ bookId: book._id, title: book.title }));

    res.json({ books: bookList });
  } catch (error) {
    logger.error(`Error fetching books for user ID: ${req.query.userId}`, error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const saveUserScore = async (req: Request, res: Response): Promise<void> => {
  try {
    const { score } = req.body;
    const { userId } = getAuth(req); // Get userId from Clerk

    if (!userId || typeof score !== 'number') {
      res.status(400).json({ error: 'userId and a valid numeric score are required' });
      return;
    }

    const newScore = new OnboardingTest({
      userId,
      score,
      dateTaken: new Date(),
    });

    await newScore.save();
    res.status(201).json({ message: 'Score saved successfully!', score: newScore });

  } catch (error: any) {
    console.error('Error saving score:', error.message);
    res.status(500).json({ error: 'Failed to save score.' });
  }
};


export default { addWordToHistory, getWordHistory, addWordToFavorites, getFavouriteWords, removeWordFromFavorites, isWordFavorite,getBooksByUserId, saveUserScore }

// Define Levels
const levels = [
  { name: "NewBie",  threshold: 0 },  // Just started, confused reader  
  { name: "Novice",  threshold: 5 },  // Reads but doesn’t fully process  
  { name: "Chad",  threshold: 10 },  // Spreads gyaan, sometimes unwanted  
  { name: "Guruji",  threshold: 15 },  // Roasting people with literature facts  
  { name: "Jethalal",  threshold: 20 },  // Rhymes like a pro  
  { name: "Shakespeare",  threshold: 25 },  // Unexpected intellectual  
  { name: "Shashi Tharoor",  threshold: 30 }  // Uses words no one understands  
];

// Function to determine level
const getCurrentAndNextLevel = (wordCount: number) => {
  let currentLevel = levels[0];
  let nextLevel = levels[1];

  for (let i = 0; i < levels.length; i++) {
    if (wordCount >= levels[i].threshold) {
      currentLevel = levels[i];
      nextLevel = levels[i + 1] || levels[i]; // Stay at highest level
    } else {
      break;
    }
  }

  const progress =
    nextLevel.threshold > currentLevel.threshold
      ? ((wordCount - currentLevel.threshold) /
          (nextLevel.threshold - currentLevel.threshold)) *
        100
      : 100;

  return { currentLevel, nextLevel, progress };
};

// API to get user level
const getUserLevel = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = getAuth(req);

    const wordHistory = await WordHistory.findOne({ userId }).lean();

    if (!wordHistory) {
      res.status(404).json({ message: "No word history found for this user." });
      return;
    }

    const wordCount = wordHistory.wordEntries.length;
    const { currentLevel, nextLevel, progress } = getCurrentAndNextLevel(wordCount);

    res.status(200).json({
      wordCount,
      currentLevel,
      nextLevel,
      progress: Math.min(progress, 100),
    });
  } catch (error) {
    console.error("Error fetching user level:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default { addWordToHistory, getWordHistory, addWordToFavorites, getFavouriteWords,getUserLevel, removeWordFromFavorites, isWordFavorite,getBooksByUserId };

