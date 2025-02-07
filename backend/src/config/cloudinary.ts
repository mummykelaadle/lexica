import { v2 as cloudinary } from 'cloudinary';
import logger from '../utils/logger';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

logger.info('Cloudinary initialized');

const uploader = cloudinary.uploader;

export default uploader;

