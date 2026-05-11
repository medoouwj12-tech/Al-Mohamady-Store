import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';
import Product from './models/Product';
import Category from './models/Category';
import Order from './models/Order';
import { products } from './data/products';
import { categories } from './data/categories';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/al-mohamady';

const importData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected...');

    await Order.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.create([
      {
        name: 'Admin User',
        email: 'admin@almohamady.com',
        password: 'password123',
        role: 'admin',
        isVerified: true
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user',
        isVerified: true
      }
    ]);

    const adminUser = createdUsers[0]._id;

    const createdCategories = await Category.insertMany(categories);

    const sampleProducts = products.map((product) => {
      // Find the correct category ObjectId
      const cat = createdCategories.find(c => c.name === product.categoryName);
      
      // Remove categoryName and replace with category ObjectId
      const { categoryName, ...rest } = product;
      
      return { 
        ...rest, 
        user: adminUser,
        category: cat ? cat._id : createdCategories[0]._id 
      };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported successfully! 🌱');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    
    await Order.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed! 🗑️');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
