import Book from "../models/bookModel";
import mongoose from "mongoose";
import logger from "./logger";

export const updateBookProgress = async (bookId:string,progress:number): Promise<void> => {
    try {
      if (!bookId || !mongoose.Types.ObjectId.isValid(bookId)) {
        logger.error(`Cannot update progess for invalid book Id:${bookId}`);
        return;
      }
  
      if (typeof progress !== "number" || progress < 1 || progress > 100) {
        logger.error(`Cannot update progess for book Id:${bookId} | Progress must be between 1 and 100`);
        return;
      }
  
      const book = await Book.findById(bookId);
  
      if (!book) {
        logger.error(`Cannot find book with Id:${bookId}`);
        return;
      }
  
      book.progress = Math.min(1, Math.floor(progress / book.pages.length))*100;
      await book.save();
  
      logger.info(`Progress set to ${progress} for book with Id:${bookId}`);
    } catch (error) {
      logger.error(`Error updating progress for book ID: ${bookId}`);
    }
  };
  