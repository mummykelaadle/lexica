import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import logger from './utils/logger';
import connectDB from './config/db';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
connectDB();


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

