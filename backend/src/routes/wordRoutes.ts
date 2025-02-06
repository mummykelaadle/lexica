import express from 'express';
import wordController from '../controllers/wordController';

const router = express.Router();

router.get('/', wordController.getWordWithDetails);

export default router;