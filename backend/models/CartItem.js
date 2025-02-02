import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const CartItem = sequelize.define('CartItem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    cartId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'cart',
            key: 'id',
        },
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'product',
            key: 'id',
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    priceAtAddition: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: 'cart_item',
    timestamps: false,
});

export default CartItem;