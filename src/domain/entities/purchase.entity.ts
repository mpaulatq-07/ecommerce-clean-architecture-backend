export class PurchaseEntity {
  constructor(
    public readonly id: number | string,
    public readonly productId: any,
    public readonly quantity: number,
    public readonly totalPrice: number,
    public readonly date: Date,
  ) {}

  // método estático que ayuda a convertir objetos planos a Entidades
  static fromObject(object: { [key: string]: any }): PurchaseEntity {
    const { id, productId, quantity, totalPrice, date } = object;
    
    if (!id) throw 'Id is required';
    if (!productId) throw 'ProductId is required';

    return new PurchaseEntity(id, productId, quantity, totalPrice, date);
  }
}