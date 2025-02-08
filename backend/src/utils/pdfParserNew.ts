import * as pdfjsLib from "pdfjs-dist";
import { fetchWordDetailsUsingDatamuse } from "../external/dictionaryApi"; // Your dictionary API handler
import Word from "../models/wordModel"; // Importing the Mongoose model
import logger from "./logger";
import { calculateWordDifficulty } from "../utils/word-difficulty/getWordDifficulty";
import { TextContent } from "pdfjs-dist/types/src/display/api";

interface WordPageObject {
  [key: number]: string[];
}

async function extractWordsFromPdf(filePath: string): Promise<WordPageObject> {
  logger.info("Extracting words from PDF:", filePath);
  const pdfDocument = await pdfjsLib.getDocument(filePath).promise; // passing filePath to getDocument() fn to load it as a doc
  const wordPages: WordPageObject = {}; // init wordPages as an empty object. This will be populated and returned

  const pagePromises: Promise<{
    pageNum: number;
    textContent:TextContent;
  }>[] = [];

  for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
    pagePromises.push(
      pdfDocument.getPage(pageNum).then(async (page) => {
        const textContent = await page.getTextContent();
        // Perform additional async operations here if needed
        return { pageNum, textContent };
      })
    );
  }

  const processedPages = await Promise.all(pagePromises);
  console.log(processedPages);
}
