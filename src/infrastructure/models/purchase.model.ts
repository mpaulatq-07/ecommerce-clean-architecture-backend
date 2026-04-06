import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/mysql-db';

export class PurchaseModel extends Model {
  public id!: number;
  public productId!: number;
  public quantity!: number;
  public totalPrice!: number;
  public date!: Date;
}

PurchaseModel.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  productId: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  totalPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  sequelize,
  tableName: 'purchases',
  timestamps: false
});