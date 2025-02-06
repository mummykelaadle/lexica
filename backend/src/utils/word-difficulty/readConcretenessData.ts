import fs from "fs";
import logger from "../logger";
let concretenessData:Record<string, number>;
try {
    const data = fs.readFileSync('./src/data/concreteness.json', 'utf8');
    concretenessData = JSON.parse(data);
    logger.info("concreteness data loaded successfully!");
} catch (err) {
    logger.error("Error loading concreteness data:", err);
}

export {concretenessData};