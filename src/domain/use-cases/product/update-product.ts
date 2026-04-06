import { ProductEntity } from '../../entities/product.entity';
import { ProductRepository } from '../../repositories/product.repository';

export interface UpdateProductUseCase {
  execute(id: string, name?: string, price?: number, stock?: number): Promise<ProductEntity>;
}

export class UpdateProduct implements UpdateProductUseCase {
  constructor(private readonly repository: ProductRepository) {}

  execute(id: string, name?: string, price?: number, stock?: number): Promise<ProductEntity> {
    return this.repository.updateById(id, name, price, stock);
  }
}