import fs from "fs";
import logger from "../logger";
type WordAOA = {
    Word: string;
    AOA: number;
  };
  
type WordAOAList = WordAOA[];
  
let aoaData:WordAOAList = [];

// Load the AoA data into memory
try {
    const rawData = fs.readFileSync("./src/data/KupermanAoA.json", "utf8");
    aoaData = JSON.parse(rawData);
    logger.info("AoA data loaded successfully!");
} catch (error) {
    logger.error("Error loading AoA data:", error);
}

export {aoaData}