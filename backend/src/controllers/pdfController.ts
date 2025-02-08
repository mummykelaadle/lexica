import { Request, Response } from "express";
import logger from "../utils/logger";
import { getAuth } from "@clerk/express";
import saveBookInDB from "../utils/pdfParsing/pdfUtils";

const processPdf = async (req: Request, res: Response) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const file = files["file"] ? files["file"][0] : null;
  logger.info(`Processing PDF`);

  if (!file) {
    logger.error("No file uploaded");
    res.status(400).json({ error: "No file uploaded" });
    return;
  }
  const { userId } = getAuth(req); // Get userId from Clerk
  if (!userId) {
    logger.error("No userId found");
    res.status(400).json({ error: "No userId found" });
    return;
  }

  try {
    await saveBookInDB(file.path, userId, req.body.title, res.locals);

    res
      .status(201)
      .json({ message: "PDF processed and data saved" });
  } catch (error) {
    logger.error("Error processing PDF: ", error);
    res.status(500).json({ error: "Error processing PDF" });
  }
};

export default { processPdf };
