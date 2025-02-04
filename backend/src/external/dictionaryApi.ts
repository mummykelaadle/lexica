import axios from 'axios';
import logger from '../utils/logger';
import dotenv from 'dotenv';

dotenv.config();

const API_BASE_URL = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json';
const API_KEY = process.env.MERRIAM_WEBSTER_API_KEY;
const DATAMUSE_API_URL = 'https://api.datamuse.com/words';

interface IWordData {
  word: string;
  meanings: string[];
  synonyms: string[];
  antonyms: string[];
  exampleSentences: string[];
  difficulty: number;
}
/**
 * Fetches and parses data for a given word from Merriam-Webster API.
 * @param word The word to look up
 * @returns Parsed JSON with word details or null
 */
const fetchWordDataUsingDictAPI = async (word: string) => {
  const url = `${API_BASE_URL}/${encodeURIComponent(word)}?key=${API_KEY}`;
  // logger.info(`Fetching word with url: ${url}`);

  try {
    logger.info(`Fetching data for word: ${word}`);
    const response = await axios.get(url);
    // logger.info(`Response data: ${JSON.stringify(response.data, null, 2)}`);

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
      exampleSentences: entry.def?.[0]?.sseq?.[0]?.[0]?.[1]?.dt?.[1]?.[1]?.[0]?.t || '',
    };

    // logger.info(`Parsed word data: ${JSON.stringify(wordData, null, 2)}`);
    return wordData;
  } catch (error: any) {
    logger.error(`Error fetching word data: ${error.message}`);
    return null;
  }
};


/**
 * Fetch structured data for a word using the Datamuse API.
 * @param word The word to look up
 * @returns Object containing word details or null if not found
 */
const fetchWordDetailsUsingDatamuse = async (word: string) => {
  try {
    logger.info(`Fetching data for word: ${word}`);

    // Fetch meanings
    const meaningsResponse = await axios.get(`${DATAMUSE_API_URL}?sp=${encodeURIComponent(word)}&md=d&max=5`);
    const meanings = meaningsResponse.data?.[0]?.defs?.map((def: string) => def.split('\t')[1]) || [];

    // Fetch synonyms
    const synonymsResponse = await axios.get(`${DATAMUSE_API_URL}?rel_syn=${encodeURIComponent(word)}&max=5`);
    const synonyms = synonymsResponse.data.map((entry: { word: string }) => entry.word);

    // Fetch antonyms
    const antonymsResponse = await axios.get(`${DATAMUSE_API_URL}?rel_ant=${encodeURIComponent(word)}&max=5`);
    const antonyms = antonymsResponse.data.map((entry: { word: string }) => entry.word);

    // Fetch example sentences (fallback logic since Datamuse doesn't provide directly)
    const exampleResponse = await axios.get(`${DATAMUSE_API_URL}?rel_trg=${encodeURIComponent(word)}&max=1`);
    const exampleSentences = exampleResponse.data[0]?.word ? `Example use: ${exampleResponse.data[0].word}` : '';

    const wordData: IWordData = {
      word,
      meanings,
      synonyms,
      antonyms,
      difficulty: 0,
      exampleSentences: [exampleSentences]
    };

    // logger.info(`Word data fetched: ${JSON.stringify(wordData)}`);
    return wordData;
  } catch (error) {
    logger.error(`Error fetching word data: ${error}`);
    return null;
  }
};

export { fetchWordDataUsingDictAPI, fetchWordDetailsUsingDatamuse };

