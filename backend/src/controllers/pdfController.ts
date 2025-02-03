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
  // return wordPages object, which has keys:page numbers and value:set of words on that page
  const pageWords = await pdfParser.extractWordsFromPdf(file.path);

  try {
    // Save word data into MongoDB page by page
    logger.info('Saving words to MongoDB page by page');
    const pageWordsEntries = Object.entries(pageWords);
    // for each page number and words set pair
    for (const [pageNumber, words] of pageWordsEntries) {
      const wordPromises = words.map(async (word: string) => {// for each word in word set
        const existingWord = await Word.findOne({ word: word });// check if its already saved in DB
        if (!existingWord) {
          // if not already saved in DB, save the word to the DB
          const newWord = new Word({ word: word, meaning: 'Meaning', difficulty: 0 });
          await newWord.save();
        }
      });

      await Promise.all(wordPromises);// wait for all word promises to resolve
      logger.info(`Words for page ${pageNumber} saved to MongoDB with ${words.length} words`);
    }

    // Create pages and associate words with them
    logger.info('Creating pages and associating words');
    const pagePromises = Object.entries(pageWords).map(async ([pageNumber, words]) => {// for each page
      const wordIds = await Promise.all(words.map(async (word: string) => {// for each word on a page
        const existingWord = await Word.findOne({ word: word });// check if word is in the DB
        return existingWord ? existingWord._id : null;// if found return its id else null
      }));
      logger.info(`Page ${pageNumber} has ${wordIds.length} words`)

      // Promise.all ensures that we wait for wordId of all words on a page to be fetched before saving the page
      // saving the page
      const page = new Page({
        pageNumber: parseInt(pageNumber),
        words: wordIds.filter(id => id !== null)// only save words for whom the id was found
      });
      logger.info(`Saving page ${pageNumber} to MongoDB`);
      await page.save();
      logger.info(`Page ${pageNumber} saved to MongoDB`);
      return page._id;
    });

    const pageIds = await Promise.all(pagePromises);// waiting for all pages to be saved

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

