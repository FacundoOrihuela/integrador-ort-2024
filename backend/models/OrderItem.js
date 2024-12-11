import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Order from './Order.js';
import Product from './Product.js';

const OrderItem = sequelize.define('OrderItem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    orderId: {
        type: DataTypes.INTEGER,
        references: {
            model: Order,
            key: 'id',
        },
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'id',
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    priceAtPurchase: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: 'order_items',
    timestamps: true,
});

export default OrderItem;