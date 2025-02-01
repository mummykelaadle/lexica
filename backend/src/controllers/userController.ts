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
      console.error(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  };