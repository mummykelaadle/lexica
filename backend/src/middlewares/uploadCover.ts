import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import uploader from '../config/cloudinary';

const uploadCover = async (req: Request, res: Response, next: NextFunction) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const coverPath = files["cover"] ? files["cover"][0] : null;

  if (coverPath) {
    try {
      const result = await uploader.upload(coverPath.path, {
        folder: 'covers',
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        invalidate: true,
        tags: ['cover'],
        resource_type: 'image',
        public_id: coverPath.filename,
      });
      logger.info(`Cover uploaded successfully`);
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
