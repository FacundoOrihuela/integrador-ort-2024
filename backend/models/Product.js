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
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id',
        },
    },
    image: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
}, {
    tableName: 'product',
    timestamps: false,
});

Product.belongsTo(Category, { foreignKey: 'categoryId' });

export default Product;