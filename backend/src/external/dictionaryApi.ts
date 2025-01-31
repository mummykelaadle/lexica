import axios from 'axios';
import logger from '../utils/logger';
import dotenv from 'dotenv';

dotenv.config();

const API_BASE_URL = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json';
const API_KEY = process.env.MERRIAM_WEBSTER_API_KEY;

/**
 * Fetches and parses data for a given word from Merriam-Webster API.
 * @param word The word to look up
 * @returns Parsed JSON with word details or null
 */
const fetchWordData = async (word: string) => {
  const url = `${API_BASE_URL}/${encodeURIComponent(word)}?key=${API_KEY}`;

  try {
    logger.info(`Fetching data for word: ${word}`);
    const response = await axios.get(url);

    if (!Array.isArray(response.data) || response.data.length === 0 || !response.data[0].meta) {
      logger.warn(`No valid results found for word: ${word}`);
      return null;
    }

    const entry = response.data[0]; // Use the first entry
    const wordData = {
      word: entry.hwi.hw,
      meanings: entry.shortdef || [],
      synonyms: entry.meta.syns?.[0] || [],
      antonyms: entry.meta.ants?.[0] || [],
      exampleSentence: entry.def?.[0]?.sseq?.[0]?.[0]?.[1]?.dt?.[1]?.[1]?.[0]?.t || '',
    };

    logger.info(`Parsed word data: ${JSON.stringify(wordData, null, 2)}`);
    return wordData;
  } catch (error: any) {
    logger.error(`Error fetching word data: ${error.message}`);
    return null;
  }
};

export default fetchWordData;

