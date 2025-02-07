import express from 'express';
import multer from 'multer';
import pdfController from '../controllers/pdfController';
import uploadCover from '../middlewares/uploadCover';
import path from 'path';


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads/'));
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});


const upload = multer({ storage: storage });

const router = express.Router();
router.post('/upload', upload.fields([{ name: 'file', maxCount: 1 }, { name: 'cover', maxCount: 1 }]), uploadCover, pdfController.processPdf);

export default router;

