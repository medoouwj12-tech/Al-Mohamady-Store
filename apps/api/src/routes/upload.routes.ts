import path from 'path';
import express, { Request } from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file: Express.Multer.File, cb: multer.FileFilterCallback) {
  const filetypes = /jpg|jpeg|png|mp4|mkv|avi|mov/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images and Videos only!'));
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// @desc    Upload an image or video
// @route   POST /api/v1/upload
// @access  Private/Admin
router.post('/', upload.single('media'), (req: Request, res: express.Response) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded' });
  }
  
  // Return the path so it can be saved in the database
  res.send(`/${req.file.path.replace(/\\/g, '/')}`);
});

export default router;
