import * as pdfjsLib from 'pdfjs-dist';
import { fetchWordDetailsUsingDatamuse } from '../external/dictionaryApi'; // Your dictionary API handler
import Word from '../models/wordModel'; // Importing the Mongoose model
import logger from './logger';

interface WordPageObject {
  [key: number]: string[];
}

async function extractWordsFromPdf(filePath: string): Promise<WordPageObject> {
  logger.info('Extracting words from PDF:', filePath);
  const pdfDocument = await pdfjsLib.getDocument(filePath).promise;// passing filePath to getDocument() fn to load it as a doc
  const wordPages: WordPageObject = {};// init wordPages as an empty object. This will be populated and returned

  for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {// iterating over pages in PDF document
    const page = await pdfDocument.getPage(pageNum);// fetch page
    const textContent = await page.getTextContent();// get page content

    // applying transformation on items
    // flatMap function will do the following:
    // 1. split each textContent based on anything that is not a-z,-,_,0-9(this is done via regex /[^a-z-_0-9]/)
    // 2. the result of split is an array
    // 3. each element of array is converted to lowercase
    // 4. leading and trailing spaces are trimmed
    //
    // Based on above 4 steps, for each item in textContent.items such an array will get created
    // the contents of all these arrays will be put into a single array
    //
    // then the elements fo new array are filtered according to the following criteria:
    // 1. if element has a digit then remove it
    // 2. if element has a length <4 remove it(this is intended to remove stopwords.TO-DO:implement fn to remove stopwords)
    // 3. if element is a duplicate of a previous element, its removed

    // the result of the above transformations is set of words of a page
    // then we add to the wordPages object - current page number : set of words
    const words: string[] = textContent.items
      .flatMap((item: any) => item.str.trim().toLowerCase().split(/[^a-z-_0-9]/))
      .filter((word, index, self) => !/\d/.test(word) && word.length >= 4 && self.indexOf(word) === index);

    wordPages[pageNum] = words;

    // following code iterates over the words of a page
    // for each word we do the following
    // 1. if word exists in DB do nothing
    // 2. if word doesn't exist in the DB then:
    //    a)fetch its details(meanings,antonyms,synonyms,exampleSentence) using datamuse API
    //    b)if details not found log an error and continue for next word
    //    c)if details are found, determine the difficulty score of word between 0 and 1(higher score means more difficult)
    //      for now difficulty is being assigned using Math.random function TO-DO:create difficulty function/use API
    //    d)finally the word along with all of its details is saved in the DB

    for (const word of words) {// iterate over the words of a page
      try {
        // Check if the word already exists in DB
        const existingWord = await Word.findOne({ word });
        if (existingWord) {// if word exists in DB do nothing
          logger.info(`Word "${word}" already exists in the database.`);
          continue;
        }
        // if word doesn't exist in the DB then:
        // Fetch dictionary data
        const wordData = await fetchWordDetailsUsingDatamuse(word);
        if (!wordData) {
          logger.warn(`No data found for word: "${word}"`);// if details not found log an error and continue for next word
          continue;
        }

        // Create the Word document in DB
        const { meanings, synonyms, antonyms, exampleSentence } = wordData;
        const difficulty = Math.random(); // Replace with proper difficulty calculation if needed
        // TO-DO:create difficulty function/use API

        await Word.create({// finally the word along with all of its details is saved in the DB
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
  return wordPages;// return wordPages object, which has keys:page numbers and value:set of words on that page
}

export default { extractWordsFromPdf };

// Example usage:
// const filePath = '/home/sujeet/todoList/backend/src/tests/sample.pdf'; // replace with your actual file path
// extractWordsFromPdf(filePath).then((result) => {
//   console.log(JSON.stringify(result, null, 2));
// }).catch((error) => {
//   console.error('Error extracting words:', error);
// });



