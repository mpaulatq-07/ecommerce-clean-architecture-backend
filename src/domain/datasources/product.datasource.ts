import { ProductEntity } from '../entities/product.entity';

export abstract class ProductDatasource {
  abstract getAll(): Promise<ProductEntity[]>;
  abstract findById(id: string): Promise<ProductEntity>;
  abstract create(name: string, price: number, stock: number): Promise<ProductEntity>;
  abstract updateById(id: string, name?: string, price?: number, stock?: number): Promise<ProductEntity>;
  abstract deleteById(id: string): Promise<ProductEntity>;
}