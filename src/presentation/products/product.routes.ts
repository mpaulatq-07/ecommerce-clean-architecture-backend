import { Router } from 'express';
import { ProductsController } from './product.controller';
import { MysqlProductDatasourceImpl } from '../../infrastructure/datasources/mysql-product.datasource.impl';
import { ProductRepositoryImpl } from '../../infrastructure/repositories/product.repository.impl';
import { MongoProductDatasourceImpl } from '../../infrastructure/datasources/mongo-product.datasource.impl';

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new MysqlProductDatasourceImpl();
    //const datasource = new MongoProductDatasourceImpl();
    const productRepository = new ProductRepositoryImpl(datasource);
    const controller = new ProductsController(productRepository);

    router.get('/', controller.getProducts);
    router.post('/', controller.createProduct);
    router.put('/:id', controller.updateProduct);    
    router.delete('/:id', controller.deleteProduct);

    return router;
  }
}