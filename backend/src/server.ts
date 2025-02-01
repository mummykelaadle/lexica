import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import pdfRoutes from './routes/pdfRoutes';
import logger from './utils/logger';
import connectDB from './config/db';
import { clerkMiddleware,requireAuth  } from '@clerk/express'

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware())

// Use routes
app.use('/api/v1/pdf', pdfRoutes);

// MongoDB connection
connectDB();


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

