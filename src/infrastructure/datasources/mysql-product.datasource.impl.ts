import { ProductDatasource } from '../../domain/datasources/product.datasource';
import { ProductEntity } from '../../domain/entities/product.entity';
import { ProductModelSql } from '../models/mysql-product.model';

export class MysqlProductDatasourceImpl implements ProductDatasource {

  async getAll(): Promise<ProductEntity[]> {
    const products = await ProductModelSql.findAll();
    return products.map(p => ProductEntity.fromObject(p.dataValues));
  }

  async create(name: string, price: number, stock: number): Promise<ProductEntity> {
    const product = await ProductModelSql.create({ name, price, stock });
    return ProductEntity.fromObject(product.dataValues);
  }

  async findById(id: string): Promise<ProductEntity> {
    const product = await ProductModelSql.findByPk(id);
    if (!product) throw `Producto con id ${id} no encontrado`;
    return ProductEntity.fromObject(product.dataValues);
  }

async updateById(id: string, name?: string, price?: number, stock?: number): Promise<ProductEntity> {
  // Buscamos el producto en la DB
  const product = await ProductModelSql.findByPk(id);
  if (!product) throw `Producto con id ${id} no encontrado`;

  const updateData: any = {};
  if (name !== undefined)  updateData.name = name;
  if (price !== undefined) updateData.price = price;
  if (stock !== undefined) updateData.stock = stock;

  // Ejecutamos la actualización
  await ProductModelSql.update(updateData, { where: { id } });

  // Retornamos el producto actualizado buscando de nuevo en la DB
  const updatedProduct = await ProductModelSql.findByPk(id);
  return ProductEntity.fromObject(updatedProduct!.dataValues);
}

  async deleteById(id: string): Promise<ProductEntity> {
    const product = await this.findById(id);
    await ProductModelSql.destroy({ where: { id } });
    return product;
  }


}