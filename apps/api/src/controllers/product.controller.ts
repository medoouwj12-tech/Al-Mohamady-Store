import { Request, Response } from 'express';
import Product from '../models/Product';
import { AuthRequest } from '../middlewares/auth';

// @desc    Fetch all products with filtering, sorting, and pagination
// @route   GET /api/v1/products
// @access  Public
export const getProducts = async (req: Request, res: Response) => {
  try {
    const pageSize = Number(req.query.limit) || 12;
    const page = Number(req.query.page) || 1;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .populate('category', 'name slug')
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      products,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Fetch single product
// @route   GET /api/v1/products/:id
// @access  Public
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name slug');

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, product });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/v1/products
// @access  Private/Admin
export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    const product = new Product({
      name: 'Sample name',
      price: 0,
      user: req.user?._id,
      image: '/images/sample.jpg',
      brand: 'Sample brand',
      category: req.body.category || null,
      stock: 0,
      numReviews: 0,
      description: 'Sample description',
      variants: [],
      images: [],
      video: '',
    });

    const createdProduct = await product.save();
    res.status(201).json({ success: true, product: createdProduct });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/v1/products/:id
// @access  Private/Admin
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      price,
      description,
      images,
      brand,
      category,
      stock,
      variants,
      isFeatured,
      video
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.images = images || product.images;
      product.brand = brand || product.brand;
      product.category = category || product.category;
      product.stock = stock || product.stock;
      product.variants = variants || product.variants;
      product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.video = video !== undefined ? video : product.video;

      const updatedProduct = await product.save();
      res.status(200).json({ success: true, product: updatedProduct });
    } else {
      res.status(404).json({ success: false, message: 'Product not found' });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/v1/products/:id
// @access  Private/Admin
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.status(200).json({ success: true, message: 'Product removed' });
    } else {
      res.status(404).json({ success: false, message: 'Product not found' });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
