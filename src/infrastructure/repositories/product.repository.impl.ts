import { ProductDatasource } from '../../domain/datasources/product.datasource';
import { ProductEntity } from '../../domain/entities/product.entity';
import { ProductRepository } from '../../domain/repositories/product.repository';

export class ProductRepositoryImpl implements ProductRepository {

  // Aquí inyectamos el Datasource (puede ser el de MySQL o el de Mongo)
  constructor(
    private readonly datasource: ProductDatasource,
  ) {}

  create(name: string, price: number, stock: number): Promise<ProductEntity> {
    return this.datasource.create(name, price, stock);
  }

  updateById(id: string, name?: string, price?: number, stock?: number): Promise<ProductEntity> {
    return this.datasource.updateById(id, name, price, stock);
  }

  deleteById(id: string): Promise<ProductEntity> {
    return this.datasource.deleteById(id);
  }

  getAll(): Promise<ProductEntity[]> {
    return this.datasource.getAll();
  }

  findById(id: string): Promise<ProductEntity> {
    return this.datasource.findById(id);
  }

}