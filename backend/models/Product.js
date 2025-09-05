import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  discount: { type: String },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  rating: { type: Number, default: 4.5 },
  reviews: { type: Number, default: 0 },
  shopkeeper: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export default model('Product', ProductSchema);