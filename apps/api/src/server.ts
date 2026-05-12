import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const PORT = parseInt(process.env.PORT || '5000', 10);
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/al-mohamady';

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`[MongoDB] Connected to database: ${MONGO_URI}`);

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`[Server] Running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('[Server] Failed to start:', error);
    process.exit(1);
  }
};

startServer();
