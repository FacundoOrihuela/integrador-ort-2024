import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Category from './Category.js';

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    price: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id',
        },
    },
}, {
    tableName: 'product',
    timestamps: false,
});

export default Product;