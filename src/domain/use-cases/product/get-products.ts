import { ProductEntity } from '../../entities/product.entity';
import { ProductRepository } from '../../repositories/product.repository';

export interface GetProductsUseCase {
  execute(): Promise<ProductEntity[]>;
}

export class GetProducts implements GetProductsUseCase {
  
  constructor(
    private readonly repository: ProductRepository,
  ) {}
  
  async execute(): Promise<ProductEntity[]> {
    return await this.repository.getAll();
  }

}