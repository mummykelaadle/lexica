import * as pdfjsLib from 'pdfjs-dist';
import fetchWordData from '../external/dictionaryApi'; // Your dictionary API handler
import Word from '../models/wordModel'; // Importing the Mongoose model
import logger from './logger';

interface WordPageObject {
  [key: number]: string[];
}

async function extractWordsFromPdf(filePath: string): Promise<WordPageObject> {
  logger.info('Extracting words from PDF:', filePath);
  const pdfDocument = await pdfjsLib.getDocument(filePath).promise;
  const wordPages: WordPageObject = {};

  for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
    const page = await pdfDocument.getPage(pageNum);
    const textContent = await page.getTextContent();

    const words: string[] = textContent.items
      .flatMap((item: any) => item.str.trim().toLowerCase().split(/[^a-z-_0-9]/))
      .filter((word, index, self) => !/\d/.test(word) && word.length >= 4 && self.indexOf(word) === index);

    wordPages[pageNum] = words;

    for (const word of words) {
      try {
        // Check if the word already exists in DB
        const existingWord = await Word.findOne({ word });
        if (existingWord) {
          logger.info(`Word "${word}" already exists in the database.`);
          continue;
        }

        // Fetch dictionary data
        const wordData = await fetchWordData(word);
        if (!wordData) {
          logger.warn(`No data found for word: "${word}"`);
          continue;
        }

        // Create the Word document in DB
        const { meanings, synonyms, antonyms, exampleSentence } = wordData;
        const difficulty = Math.random(); // Replace with proper difficulty calculation if needed

        await Word.create({
          word,
          meanings,
          synonyms,
          antonyms,
          exampleSentence,
          difficulty,
        });

        logger.info(`Word "${word}" saved to the database.`);
      } catch (error: any) {
        logger.error(`Error processing word "${word}": ${error.message}`);
      }
    }
  }

  logger.info('Word extraction and storage complete.');
  return wordPages;
}

export default { extractWordsFromPdf };

// Example usage:
// const filePath = '/home/sujeet/todoList/backend/src/tests/sample.pdf'; // replace with your actual file path
// extractWordsFromPdf(filePath).then((result) => {
//   console.log(JSON.stringify(result, null, 2));
// }).catch((error) => {
//   console.error('Error extracting words:', error);
// });



