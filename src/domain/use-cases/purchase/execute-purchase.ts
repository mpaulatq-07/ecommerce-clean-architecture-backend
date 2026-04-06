import { PurchaseRepository } from '../../repositories/purchase.repository';
import { ProductRepository } from '../../repositories/product.repository';

export class ExecutePurchase {
  constructor(
    private readonly purchaseRepository: PurchaseRepository,
    private readonly productRepository: ProductRepository
  ) {}

  async execute(productId: string, quantity: number, customerMoney: number) {
    const product = await this.productRepository.findById(productId);
    if (!product) throw 'Producto no encontrado';

    // 1. Validar Stock
    if (product.stock < quantity) {
      throw `Insuficiencia en el stock. Solo quedan ${product.stock} unidades.`;
    }

    const totalPrice = product.price * quantity;

    // 2. Validar Dinero del Cliente
    if (customerMoney < totalPrice) {
      const falta = totalPrice - customerMoney;
      throw `Dinero insuficiente. El total es ${totalPrice}, faltan ${falta.toFixed(2)}`;
    }

    const change = customerMoney - totalPrice;

    // 3. Restar Stock
    const newStock = product.stock - quantity;
    await this.productRepository.updateById(productId, undefined, undefined, newStock);

    // 4. Registrar Compra
    const purchase = await this.purchaseRepository.create(productId, quantity, totalPrice);

    return {
      ...purchase,
      totalPrice,
      customerMoney,
      change: change.toFixed(2),
      message: 'Compra exitosa'
    };
  }
}