import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller';
import { protect, authorize } from '../middlewares/auth';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, authorize('admin'), createProduct);

router.route('/:id')
  .get(getProductById)
  .put(protect, authorize('admin'), updateProduct)
  .delete(protect, authorize('admin'), deleteProduct);

export default router;
