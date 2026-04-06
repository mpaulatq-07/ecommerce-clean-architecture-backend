import { ProductDatasource } from '../../domain/datasources/product.datasource';
import { ProductEntity } from '../../domain/entities/product.entity';
import { MongoProductModel } from '../models/mongo-product.model';

export class MongoProductDatasourceImpl implements ProductDatasource {
  
  async getAll(): Promise<ProductEntity[]> {
    const products = await MongoProductModel.find();
    return products.map(p => new ProductEntity(p._id.toString(), p.name, p.price, p.stock));
  }

  async findById(id: string): Promise<ProductEntity> {
    const product = await MongoProductModel.findById(id);
    if (!product) throw new Error('Product not found in Mongo');
    return new ProductEntity(product._id.toString(), product.name, product.price, product.stock);
  }

  async create(name: string, price: number, stock: number): Promise<ProductEntity> {
    const product = await MongoProductModel.create({ name, price, stock });
    return new ProductEntity(product._id.toString(), product.name, product.price, product.stock);
  }

  async updateById(id: string, name?: string, price?: number, stock?: number): Promise<ProductEntity> {
    const product = await MongoProductModel.findByIdAndUpdate(id, { name, price, stock }, { new: true });
    if (!product) throw new Error('Product not found');
    return new ProductEntity(product._id.toString(), product.name, product.price, product.stock);
  }

  async deleteById(id: string): Promise<ProductEntity> {
    const product = await MongoProductModel.findByIdAndDelete(id);
    if (!product) throw new Error('Product not found');
    return new ProductEntity(product._id.toString(), product.name, product.price, product.stock);
  }
}