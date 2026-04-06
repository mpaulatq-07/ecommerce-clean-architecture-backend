import { Router } from 'express';
import { PurchaseController } from './purchase.controller';
//IMPORTACIONES MYSQL
import { MysqlPurchaseDatasourceImpl } from '../../infrastructure/datasources/mysql-purchase.datasource.impl';
import { MysqlProductDatasourceImpl } from '../../infrastructure/datasources/mysql-product.datasource.impl';
//IMPORTACIONES MONGO
import { MongoPurchaseDatasourceImpl } from '../../infrastructure/datasources/mongo-purchase.datasource.impl';
import { MongoProductDatasourceImpl } from '../../infrastructure/datasources/mongo-product.datasource.impl';

import { PurchaseRepositoryImpl } from '../../infrastructure/repositories/purchase.repository.impl';
import { ProductRepositoryImpl } from '../../infrastructure/repositories/product.repository.impl';

export class PurchaseRoutes {
  static get routes(): Router {
    const router = Router();

    // Compras
    const purchaseDatasource = new MysqlPurchaseDatasourceImpl();
    //const purchaseDatasource = new MongoPurchaseDatasourceImpl();
    const purchaseRepository = new PurchaseRepositoryImpl(purchaseDatasource);

    // Productos (necesario para la simulación de stock)
    const productDatasource = new MysqlProductDatasourceImpl();
    //const productDatasource = new MongoProductDatasourceImpl();
    const productRepository = new ProductRepositoryImpl(productDatasource);

    const controller = new PurchaseController(purchaseRepository, productRepository);

    router.post('/', controller.executePurchase);
    router.get('/history', controller.getHistory); 

    return router;
  }
}