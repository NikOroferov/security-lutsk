import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: {
    ru: string;
    uk: string;
  };
  slug: string;
  description: {
    ru: string;
    uk: string;
  };
  image: string;
  parent: mongoose.Types.ObjectId | null;
  order: number;
}

const CategorySchema: Schema = new Schema(
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
    image: { type: String },
    parent: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema); 