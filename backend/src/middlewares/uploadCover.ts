import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import uploader from '../config/cloudinary';
import sharp from 'sharp';
import fs from 'fs';
import util from 'util';

const unlinkFile = util.promisify(fs.unlink);

const uploadCover = async (req: Request, res: Response, next: NextFunction) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const coverPath = files["cover"] ? files["cover"][0] : null;

  if (coverPath) {
    try {
      const resizedImagePath = `./uploads/lr_${coverPath.filename}`;
      await sharp(coverPath.path)
        .resize(250, 400)
        .toFile(resizedImagePath);

      const result = await uploader.upload(resizedImagePath, {
        folder: 'covers',
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        invalidate: true,
        tags: ['cover'],
        resource_type: 'image',
        public_id: coverPath.filename,
      });

      await unlinkFile(resizedImagePath);

      logger.info(`Cover uploaded successfully`);
      // Putting the cover URL in res.locals so that it can be accessed in the next middleware
      // for some reason if we put it in req.locals, it doesn't work
      res.locals.coverUrl = result.secure_url;
      logger.info(`Cover URL: ${res.locals.coverUrl}`);
    } catch (error) {
      logger.error(`Error uploading cover: ${error}`);
      res.status(500).json({ error: 'Error uploading cover' });
    }
  }
  next();
}

export default uploadCover;
