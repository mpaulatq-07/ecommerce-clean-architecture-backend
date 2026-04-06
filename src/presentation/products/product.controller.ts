import { Request, Response } from 'express';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { CreateProduct } from '../../domain/use-cases/product/create-product';
import { GetProducts } from '../../domain/use-cases/product/get-products';
import { UpdateProduct } from '../../domain/use-cases/product/update-product';
import { DeleteProduct } from '../../domain/use-cases/product/delete-product';

export class ProductsController {

  constructor(private readonly productRepository: ProductRepository) {}

  public getProducts = (req: Request, res: Response) => {
    new GetProducts(this.productRepository)
      .execute()
      .then(products => res.json(products))
      .catch(error => res.status(400).json({ error }));
  };

  public createProduct = async (req: Request, res: Response) => {
    try {
      const { name, price, stock } = req.body;
    if (!name || !price) return res.status(400).json({ error: 'Nombre y precio requeridos' });

    const productCreate = await new CreateProduct(this.productRepository)
      .execute(name, +price, +stock);
      res.json(productCreate)
    } catch (error) {
      console.log(error)
      res.status(400).json({ error });
    }
  };

  public updateProduct = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string; 
      const { name, price, stock } = req.body;

      const productUpdate = await new UpdateProduct(this.productRepository)
        .execute(id, name, price ? +price : undefined, stock ? +stock : undefined);
      
      res.json({
        message: 'Producto actualizado exitosamente',
        data: productUpdate 
      });

    } catch (error) {
      res.status(400).json({ error });
    }
  };

  public deleteProduct = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string; 

      const productDeleted = await new DeleteProduct(this.productRepository)
        .execute(id);
      
      res.json({ message: 'Producto eliminado exitosamente', 
        product: productDeleted 
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  };
}