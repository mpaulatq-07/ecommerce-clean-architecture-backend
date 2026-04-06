import { PurchaseModel } from '../models/purchase.model';
import { ProductModelSql } from '../models/mysql-product.model';
import { PurchaseEntity } from '../../domain/entities/purchase.entity';
import { PurchaseRepository } from '../../domain/repositories/purchase.repository';
import { Op } from 'sequelize';

export class MysqlPurchaseDatasourceImpl implements PurchaseRepository {

  async create(productId: string, quantity: number, totalPrice: number): Promise<PurchaseEntity> {
    const purchase = await PurchaseModel.create({
      productId: +productId,
      quantity,
      totalPrice
    });

    const product = await ProductModelSql.findByPk(productId);

    return new PurchaseEntity(
      purchase.id, 
      purchase.productId, 
      purchase.quantity, 
      purchase.totalPrice, 
      purchase.date
    );
  }

  // Esta es la parte del historial diario
  async getDailyHistory(date: Date): Promise<PurchaseEntity[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const purchases = await PurchaseModel.findAll({
      where: {
        date: {
          [Op.between]: [startOfDay, endOfDay]
        }
      }
    });

// Usamos Promise.all para manejar las búsquedas asíncronas de nombres dentro del map
    return Promise.all(purchases.map(async (p) => {
      
      // 1. Buscamos el producto por su ID
      const product = await ProductModelSql.findByPk(p.dataValues.productId);
      
      // 2. Creamos la entidad inyectando el NOMBRE en el campo productId
      return new PurchaseEntity(
        p.dataValues.id,
        product ? product.name : `ID: ${p.dataValues.productId}`, 
        p.dataValues.quantity,
        p.dataValues.totalPrice,
        p.dataValues.date
      );
    }));
  }
}