import * as pdfjsLib from 'pdfjs-dist';
import { TextContent } from 'pdfjs-dist/types/src/display/api';
import IPagePromise from '../../interfaces/IPagePromise';
import Word from '../../models/wordModel';
import { fetchWordDetailsUsingDatamuse } from '../../external/dictionaryApi';
import logger from '../logger';
import Mongoose from 'mongoose';
import Page from '../../models/pageModel';
import Book from '../../models/bookModel';


function getPagesPromises(book: any): Promise<IPagePromise>[] {
  const pages = [];
  for (let i = 1; i <= book.numPages; i++) {
    pages.push(book.getPage(i));

  }
  return pages;
}

function getTextContents(pages: any): Promise<TextContent>[] {
  const textContent = [];
  for (let i = 0; i < pages.length; i++) {
    textContent.push(pages[i].getTextContent());
  }
  return textContent;
}
function getWordsFromTextContent(textContent: TextContent): string[] {
  const words: string[] = textContent.items
    .flatMap((item: any) => item.str.trim().toLowerCase().split(/[^a-z-_0-9]/))
    .filter((word, index, self) => !/\d/.test(word) && word.length >= 4 && self.indexOf(word) === index);
  return words;
}

// return [  [page 1 ke word], [page 2 ke word], ... ]
function getWordsInPages(pages: TextContent[]): string[][] {
  const wordsInPages: string[][] = [];


  pages.map((page: TextContent) => {
    wordsInPages.push(getWordsFromTextContent(page));
  });
  return wordsInPages;
}

const getWordIdsBatch = async (words: string[]): Promise<(string | null)[]> => {
  const records = await Word.find({ word: { $in: words } });
  const recordMap = new Map(records.map((rec) => [rec.word, rec._id]));

  return words.map((word) => recordMap.get(word)?.toString() || null);
};


//  ek page ke liye, pageno. and array of word id return

async function processPage(pageNo: number, wordsInPage: string[]): Promise<{ pageNo: number, wordIds: (string)[] }> {
  const wordIdBatch = await getWordIdsBatch(wordsInPage);

  // Parallel processing of words
  const wordDataPromises = wordIdBatch.map(async (wordId, index) => {
    const word = wordsInPage[index];
    if (wordId) {
      logger.info(`Word "${word}" already exists in the database.`);
      return wordId; // Return existing ObjectId
    }

    try {
      logger.info(`Fetching data for word: ${word}`);
      const wordData = await fetchWordDetailsUsingDatamuse(word);
      logger.info(`Fetched data for word: ${word}`);
      if (wordData) {
        logger.info(`Creating new word record for word: ${word}`);
        const newWordRecord = new Word(wordData);
        const savedWord = await newWordRecord.save();
        logger.info(`Word "${word}" saved to the database.`);
        return savedWord._id.toString();
      }
    } catch (error) {
      logger.error(`Error processing word '${word}': ${error}`);
    }
    logger.info(`Word "${word}" count not be saved to the database.`);
    return "";
  });

  // Wait for all processing to complete
  const wordIds = await Promise.all(wordDataPromises);

  return { pageNo, wordIds };
  // NOTE: if a word is not added in db, its id will be returned as ""
}

async function saveBookInDB(path: string, userId: string, title: string) {
  const pdfDocument = await pdfjsLib.getDocument(path).promise;

  const pagePromises = getPagesPromises(pdfDocument);
  const pages = await Promise.all(pagePromises);
  const textContents = await Promise.all(getTextContents(pages));

  const wordsInPages = getWordsInPages(textContents);

  const proccessedPages: Promise<{ pageNo: number, wordIds: string[] }>[] = [];

  wordsInPages.map((words: string[], index: number) => {
    proccessedPages.push(processPage(index, words));
  });

  await Promise.all(proccessedPages);
  // now all words are in db
  // TODO : put pages with their word id in DB
  // and return book

  const pagePromisesDB = Object.entries(processPage).map(
    async ([pageNo, words]) => {
      const page = new Page({
        pageNumber: parseInt(pageNo),
        words: words.map((word: string) => new Mongoose.Types.ObjectId(word)),
      });
      await page.save();
      return page._id;
    }
  );

  const pageIds = await Promise.all(pagePromisesDB);

  const book = new Book({
    ownerId: userId,
    title: title || "Book Title",
    pages: pageIds,
  });

  await book.save();
  logger.info("Book saved to MongoDB");
}

export default saveBookInDB;
