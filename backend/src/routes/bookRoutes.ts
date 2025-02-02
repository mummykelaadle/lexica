import express from 'express';
import bookController from '../controllers/bookController';

const router = express.Router();

// Route returns the complete book along with all its pages and words populated
router.get('/', bookController.getBookWithDetails);

// Route returns the specified set of pages along with all its words populated
// see the associated controller for more information
router.get('/pages', bookController.getBookPages);

// Route sorts the pages of a book based on their page number
router.get('/sortPages', bookController.sortAndUpdatePages);

export default router;