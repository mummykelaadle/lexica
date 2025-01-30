import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../utils/logger';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '');
    logger.info('MongoDB connected');
  } catch (err) {
    logger.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;

