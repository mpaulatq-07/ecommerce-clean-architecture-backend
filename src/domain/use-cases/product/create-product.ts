import { ProductEntity } from '../../entities/product.entity';
import { ProductRepository } from '../../repositories/product.repository';

export class CreateProduct {
  constructor(
    private readonly repository: ProductRepository,
  ) {}

  public async execute( name: string, price: number, stock: number ): Promise<ProductEntity> {
    return await this.repository.create( name, price, stock );
  }
}