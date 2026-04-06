import { Router } from 'express';
import { ProductRoutes } from './products/product.routes';
import { PurchaseRoutes } from './purchases/purchase.routes';


export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/products", ProductRoutes.routes)
    console.log("Hola")

    router.use('/api/purchases', PurchaseRoutes.routes);

    return router;
  }
}