import { PurchaseEntity } from '../entities/purchase.entity';

export abstract class PurchaseDatasource {
  abstract create(productId: string, quantity: number, totalPrice: number): Promise<PurchaseEntity>;
  abstract getDailyHistory(date: Date): Promise<PurchaseEntity[]>;
}