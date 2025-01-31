import { Request, Response } from 'express';
import pdfParser from '../utils/pdfParser';
import Word from '../models/wordModel';
import Page from '../models/pageModel';
import Book from '../models/bookModel';
import logger from '../utils/logger';

const processPdf = async (req: Request, res: Response) => {
  const { file } = req;
  logger.info(`Processing PDF`);

  // Use pdfParser to extract words
  if (!file) {
    logger.error('No file uploaded');
    res.status(400).json({ error: 'No file uploaded' });
    return undefined;
  }
  const pageWords = await pdfParser.extractWordsFromPdf(file.path);

  try {
    // Save word data into MongoDB page by page
    logger.info('Saving words to MongoDB page by page');
    const pageWordsEntries = Object.entries(pageWords);

    for (const [pageNumber, words] of pageWordsEntries) {
      const wordPromises = words.map(async (word: string) => {
        const existingWord = await Word.findOne({ word: word });
        if (!existingWord) {
          const newWord = new Word({ word: word, meaning: 'Meaning', difficulty: 0 });
          await newWord.save();
        }
      });

      await Promise.all(wordPromises);
      logger.info(`Words for page ${pageNumber} saved to MongoDB with ${words.length} words`);
    }

    // Create pages and associate words with them
    logger.info('Creating pages and associating words');
    const pagePromises = Object.entries(pageWords).map(async ([pageNumber, words]) => {
      const wordIds = await Promise.all(words.map(async (word: string) => {
        const existingWord = await Word.findOne({ word: word });
        return existingWord ? existingWord._id : null;
      }));
      logger.info(`Page ${pageNumber} has ${wordIds.length} words`)

      const page = new Page({
        pageNumber: parseInt(pageNumber),
        words: wordIds.filter(id => id !== null)
      });
      logger.info(`Saving page ${pageNumber} to MongoDB`);
      await page.save();
      logger.info(`Page ${pageNumber} saved to MongoDB`);
      return page._id;
    });

    const pageIds = await Promise.all(pagePromises);

    // Create the book object and associate pages
    const book = new Book({
      // title: req.body.title, // TODO add title to request
      title: 'Book Title',
      pages: pageIds
    });

    logger.info('Saving book to MongoDB');
    await book.save();
    logger.info('Book saved to MongoDB');

    res.status(201).json({ message: 'PDF processed and data saved', bookId: book._id });
  } catch (error) {
    logger.error('Error processing PDF: ', error);
    res.status(500).json({ error: 'Error processing PDF' });
  }
};

export default { processPdf };

