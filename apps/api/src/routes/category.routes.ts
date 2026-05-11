import express from 'express';
import { getCategories, createCategory } from '../controllers/category.controller';
import { protect, authorize } from '../middlewares/auth';

const router = express.Router();

router.route('/')
  .get(getCategories)
  .post(protect, authorize('admin'), createCategory);

export default router;
