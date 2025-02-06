import { Request, Response } from "express";
import pdfParser from "../utils/pdfParser";
import Word from "../models/wordModel";
import Page from "../models/pageModel";
import Book from "../models/bookModel";
import logger from "../utils/logger";
import { getAuth } from "@clerk/express";
import { fetchWordDetailsUsingDatamuse } from "../external/dictionaryApi";

const processPdf = async (req: Request, res: Response) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const file = files["file"] ? files["file"][0] : null;
  logger.info(`Processing PDF`);

  if (!file) {
    logger.error("No file uploaded");
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  try {
    const pageWords = await pdfParser.extractWordsFromPdf(file.path);

    // Collect all unique words
    const allWords = new Set<string>();
    Object.values(pageWords).forEach((words) =>
      words.forEach((word: string) => allWords.add(word))
    );

    // Fetch existing words from the database
    const existingWords = await Word.find({
      word: { $in: Array.from(allWords) },
    });
    const existingWordSet = new Set(existingWords.map((word) => word.word));

    // Fetch data for new words from the external API
    const newWords = Array.from(allWords).filter(
      (word) => !existingWordSet.has(word)
    );
    const newWordDataPromises = newWords.map((word) =>
      fetchWordDetailsUsingDatamuse(word)
    );
    const newWordData = await Promise.all(newWordDataPromises);

    // Save new words to the database
    const newWordDocs = newWordData.map(
      (wordData) =>
        new Word({
          word: wordData?.word,
          meaning: wordData?.meanings,
          synonyms: wordData?.synonyms,
          antonyms: wordData?.antonyms,
          exampleSentences: wordData?.exampleSentences,
          difficulty: wordData?.difficulty,
        })
    );
    await Word.insertMany(newWordDocs);

    // Create pages and associate words
    const pagePromises = Object.entries(pageWords).map(
      async ([pageNumber, words]) => {
        const wordIds = await Word.find({ word: { $in: words } }).select("_id");
        const page = new Page({
          pageNumber: parseInt(pageNumber),
          words: wordIds.map((word) => word._id),
        });
        await page.save();
        return page._id;
      }
    );

    const pageIds = await Promise.all(pagePromises);

    const { userId } = getAuth(req); // Get userId from Clerk
    // Create the book object and associate pages
    const book = new Book({
      ownerId:userId,
      title: req.body.title || "Book Title",
      pages: pageIds,
    });

    await book.save();
    logger.info("Book saved to MongoDB");

    res
      .status(201)
      .json({ message: "PDF processed and data saved", bookId: book._id });
  } catch (error) {
    logger.error("Error processing PDF: ", error);
    res.status(500).json({ error: "Error processing PDF" });
  }
};

export default { processPdf };
