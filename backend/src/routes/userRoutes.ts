import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

//this route adds the word with wordId specified in request body to current user's history
router.post('/history/add-word',userController.addWordToHistory);
//this route returns all the word in current user's history
router.get('/history',userController.getWordHistory);

export default router;