import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

//this route adds the word with wordId specified in request body to current user's history
router.post('/history/add-word',userController.addWordToHistory);
//this route returns all the word in current user's history
router.get('/history',userController.getWordHistory);


/** ❤️ Favorite Words Routes */
router.get("/favorites/:wordId/is-favorite", userController.isWordFavorite);

// Add a word to the user's favorites
router.post("/favorites/add-word", userController.addWordToFavorites);

// Get all favorite words for the user
router.get("/favorites", userController.getFavouriteWords);

// Remove a word from the user's favorites
router.delete("/favorites/:wordId", userController.removeWordFromFavorites);
export default router;