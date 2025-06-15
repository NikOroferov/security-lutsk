import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: {
    ru: string;
    uk: string;
  };
  slug: string;
  description: {
    ru: string;
    uk: string;
  };
  price: number;
  category: mongoose.Types.ObjectId;
  specifications: {
    ru: Array<{
      name: string;
      value: string;
    }>;
    uk: Array<{
      name: string;
      value: string;
    }>;
  };
  images: string[];
  mainImage: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: {
      ru: { type: String, required: true },
      uk: { type: String, required: true },
    },
    slug: { type: String, required: true, unique: true },
    description: {
      ru: { type: String, required: true },
      uk: { type: String, required: true },
    },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    specifications: {
      ru: [
        {
          name: { type: String, required: true },
          value: { type: String, required: true },
        },
      ],
      uk: [
        {
          name: { type: String, required: true },
          value: { type: String, required: true },
        },
      ],
    },
    images: [{ type: String }],
    mainImage: { type: String, required: true },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema); 