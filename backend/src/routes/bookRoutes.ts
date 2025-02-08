import express from 'express';
import bookController from '../controllers/bookController';

const router = express.Router();

// Route returns the complete book along with all its pages and words populated
router.get("/words/:bookId", bookController.getAllWordsFromBook);
// Route returns the specified set of pages along with all its words populated
// see the associated controller for more information
router.get('/pages', bookController.getBookPages);

// Route sorts the pages of a book based on their page number
router.get('/sortPages', bookController.sortAndUpdatePages);

// Route returns the title of a book based on bookId as a param
router.get('/title', bookController.getBookTitle);

// Route returns the total page count
router.get('/pageCount', bookController.getTotalPageCount);

export default router;