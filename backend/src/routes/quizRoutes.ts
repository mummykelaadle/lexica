import express from 'express';
import quizController from '../controllers/quizController';


const router = express.Router();

// Make sure the handler matches what express expects (Request and Response)
//@ts-ignore
router.get('/', quizController.generateQuiz);
//@ts-ignore
router.get("/spacedQuiz", quizController.generateSpacedRepetitionQuiz);
router.post("/spacedQuizResult", quizController.handleSpacedRepetitionResult);

export default router;
