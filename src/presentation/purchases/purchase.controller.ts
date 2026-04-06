import { Request, Response } from 'express';
import { PurchaseRepository } from '../../domain/repositories/purchase.repository';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { ExecutePurchase } from '../../domain/use-cases/purchase/execute-purchase';

export class PurchaseController {
  constructor(
    private readonly purchaseRepository: PurchaseRepository,
    private readonly productRepository: ProductRepository
  ) {}

  // ESTA ES LA SIMULACIÓN DE COMPRA
  public executePurchase = async (req: Request, res: Response) => {
    try {
      const { productId, quantity, customerMoney } = req.body;
      
      // Llamamos al caso de uso que resta stock y crea la compra
      const result = await new ExecutePurchase(this.purchaseRepository, this.productRepository)
        .execute(productId, +quantity, +customerMoney);

      res.json(result);

    } catch (error) {
      // Aquí se capturarán los mensajes: "Dinero insuficiente" o "Stock insuficiente"
      res.status(400).json({ error: String(error) });
    }
  };

  // ESTE ES EL HISTORIAL
  public getHistory = async (req: Request, res: Response) => {
    try {
      const dateQuery = req.query.date as string;
      const date = dateQuery ? new Date(dateQuery) : new Date();

      const history = await this.purchaseRepository.getDailyHistory(date);
      res.json({
        date: date.toISOString().split('T')[0],
        total_purchases: history.length,
        history
      });
    } catch (error) {
      res.status(400).json({ error: String(error) });
    }
  };
}