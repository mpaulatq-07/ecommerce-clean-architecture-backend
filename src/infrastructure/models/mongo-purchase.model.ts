import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
  // Guardamos el ID de Mongo del producto para poder hacer el "JOIN" (populate)
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

export const MongoPurchaseModel = mongoose.model('Purchase', purchaseSchema);