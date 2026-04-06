import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

// El nombre 'Product' es el que se usa para las relaciones (ref)
export const MongoProductModel = mongoose.model('Product', productSchema);