import mongoose from 'mongoose';

export class MongoDatabase {
  static async connect() {
    try {
      const url = 'mongodb://localhost:27017/ecommerce_db';   
      await mongoose.connect(url);
      console.log('MongoDB connected to: ecommerce_db');
    } catch (error) {
      console.error('Mongo connection error:', error);
      throw error;
    }
  }
}