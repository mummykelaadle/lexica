import express from 'express';
import quizController from '../controllers/quizController';

const router = express.Router();

// Make sure the handler matches what express expects (Request and Response)
//@ts-ignore
router.get('/', quizController.generateQuiz);


export default router;
