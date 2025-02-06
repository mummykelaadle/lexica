import { Request, Response } from "express";
import Word from "../models/wordModel";
import logger from "../utils/logger";

export const getWordWithDetails = (req: Request, res: Response)=> {
  const { word } = req.query;
  logger.info(`Fetching word details for: ${word}`);

  if (!word || typeof word !== "string") {
    logger.info(`Invalid or missing word parameter`);
    res.status(400).json({ message: "Invalid or missing word parameter" });
  }

  Word.findOne({ word })
    .then((wordData) => {
      if (!wordData) {
        logger.info(`Word not found`);
        res.status(404).json({ message: "Word not found" });
      }
      logger.info(`Word found.`);
      res.status(200).json(wordData);
    })
    .catch((error) => {
      logger.error(`Error fetching word details for: ${word}`, error);
      res.status(500).json({ message: "Internal server error", error });
    });
};

export default { getWordWithDetails };