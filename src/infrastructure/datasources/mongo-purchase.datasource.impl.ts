import { PurchaseDatasource } from '../../domain/datasources/purchase.datasource';
import { PurchaseEntity } from '../../domain/entities/purchase.entity';
import { MongoPurchaseModel } from '../models/mongo-purchase.model';
import { MongoProductModel } from '../models/mongo-product.model';
import { ProductDatasource } from '../../domain/datasources/product.datasource';

export class MongoPurchaseDatasourceImpl implements PurchaseDatasource {

  /**
   * Crea una compra, resta el stock del producto y devuelve la entidad.
   */
  async create(productId: string, quantity: number, totalPrice: number): Promise<PurchaseEntity> {
    
    // 1. Buscamos el producto y restamos el stock de forma atómica en Mongo
    const updatedProduct = await MongoProductModel.findByIdAndUpdate(
      productId,
      { $inc: { stock: -quantity } }, // $inc con número negativo resta el stock
      { new: true } // Para que nos devuelva el producto YA actualizado
    );

    if (!updatedProduct) throw new Error(`Product with ID ${productId} not found in MongoDB`);

    // 2. Registramos la compra en la colección de Purchases
    const purchase = await MongoPurchaseModel.create({
      productId,
      quantity,
      totalPrice,
      date: new Date()
    });

    // 3. Mapeamos a nuestra Entidad de Dominio
    // Usamos el nombre que acabamos de obtener del producto actualizado
    return new PurchaseEntity(
      purchase._id.toString(),
      updatedProduct.name, 
      purchase.quantity,
      purchase.totalPrice,
      purchase.date
    );
  }

  /**
   * Obtiene todas las compras de una fecha específica.
   */
  async getDailyHistory(date: Date): Promise<PurchaseEntity[]> {
    
    // Configuramos el rango: desde las 00:00:00 hasta las 23:59:59 del día solicitado
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // Buscamos compras en ese rango y hacemos "JOIN" con la colección de productos
    const purchases = await MongoPurchaseModel.find({
      date: { $gte: startOfDay, $lte: endOfDay }
    }).populate('productId'); 

    // Mapeamos el array de resultados de Mongo a nuestro array de Entidades
    return purchases.map( p => {
        // Hacemos un cast a 'any' para extraer el nombre del producto populado
        const productData = p.productId as any;
        
        return new PurchaseEntity(
            p._id.toString(),
            productData?.name || 'Producto no encontrado', // Por si el producto fue borrado
            p.quantity,
            p.totalPrice,
            p.date
        );
    });
  }
}