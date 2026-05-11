import mongoose, { Document, Schema } from 'mongoose';

export interface ICoupon extends Document {
  code: string;
  discount: number;
  isActive: boolean;
  expiryDate: Date;
}

const couponSchema: Schema = new Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true },
    discount: { type: Number, required: true, min: 1, max: 100 },
    isActive: { type: Boolean, default: true },
    expiryDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ICoupon>('Coupon', couponSchema);
