import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

const categorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a category name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Name can not be more than 50 characters'],
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      default: 'no-photo.jpg',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICategory>('Category', categorySchema);
