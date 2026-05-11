import { Request, Response } from 'express';
import Category from '../models/Category';

// @desc    Get all categories
// @route   GET /api/v1/categories
// @access  Public
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({ success: true, count: categories.length, categories });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a category
// @route   POST /api/v1/categories
// @access  Private/Admin
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, slug, description, image } = req.body;
    
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({ success: false, message: 'Category already exists' });
    }

    const category = await Category.create({ name, slug, description, image });
    res.status(201).json({ success: true, category });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
