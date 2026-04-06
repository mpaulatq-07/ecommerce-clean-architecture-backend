import { PurchaseEntity } from '../../domain/entities/purchase.entity';
import { PurchaseRepository } from '../../domain/repositories/purchase.repository';
import { MysqlPurchaseDatasourceImpl } from '../datasources/mysql-purchase.datasource.impl';

export class PurchaseRepositoryImpl implements PurchaseRepository {
  constructor(private readonly datasource: MysqlPurchaseDatasourceImpl) {}

  create(productId: string, quantity: number, totalPrice: number): Promise<PurchaseEntity> {
    return this.datasource.create(productId, quantity, totalPrice);
  }

  getDailyHistory(date: Date): Promise<PurchaseEntity[]> {
    return this.datasource.getDailyHistory(date);
  }
}