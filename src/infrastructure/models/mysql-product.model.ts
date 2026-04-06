import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/mysql-db'; 

export class ProductModelSql extends Model {
  declare id: number;
  declare name: string;
  declare price: number;
  declare stock: number;
}

ProductModelSql.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  name: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  price: { 
    type: DataTypes.FLOAT, 
    allowNull: false 
  },
  stock: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
}, {
  sequelize,
  modelName: 'product',
  timestamps: false 
});