import express from 'express';
import multer from 'multer';
import pdfController from '../controllers/pdfController';
import path from 'path';


const upload = multer({ dest: path.join(__dirname, '../../uploads/') });

const router = express.Router();
router.post('/upload', upload.single('file'), pdfController.processPdf);

// Route to upload and process PDF
// router.post('/upload', pdfController.processPdf);

export default router;


