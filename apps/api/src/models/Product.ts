import mongoose, { Document, Schema } from 'mongoose';

export interface IReview {
  user: mongoose.Schema.Types.ObjectId;
  name: string;
  rating: number;
  comment: string;
}

export interface IProduct extends Document {
  user: mongoose.Schema.Types.ObjectId;
  category: mongoose.Schema.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  images: string[];
  brand: string;
  stock: number;
  ratings: number;
  numReviews: number;
  reviews: IReview[];
  isFeatured: boolean;
  video?: string;
  variants: { color: string; size: string; stock: number }[];
}

const reviewSchema: Schema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema: Schema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    category: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Category' },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    images: [{ type: String, required: true }],
    brand: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    ratings: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    reviews: [reviewSchema],
    isFeatured: { type: Boolean, default: false },
    video: { type: String },
    variants: [
      {
        color: { type: String },
        size: { type: String },
        stock: { type: Number, default: 0 },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProduct>('Product', productSchema);
