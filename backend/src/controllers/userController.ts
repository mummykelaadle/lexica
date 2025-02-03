import mongoose, { Document } from 'mongoose';
import { Request, Response } from 'express';
import Book from '../models/bookModel';
import Page from '../models/pageModel';
import WordHistory from "../models/wordHistory";
import { getAuth} from '@clerk/express'

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

export default {addWordToHistory,getWordHistory};
