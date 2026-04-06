export class ProductEntity {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public stock: number,
    public description?: string,
  ) {}

  public static fromObject(object: { [key: string]: any }): ProductEntity {
    const { id, _id, name, price, stock, description } = object;
    return new ProductEntity(id || _id, name, price, stock, description);
  }
}