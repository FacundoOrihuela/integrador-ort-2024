import sequelize from '../config/database.js';
import User from './User.js';
import Cart from './Cart.js';
import CartItem from './CartItem.js';
import Product from './Product.js';

// Definir relaciones
User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

Cart.hasMany(CartItem, { foreignKey: 'cartId' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

Product.hasMany(CartItem, { foreignKey: 'productId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });

export { sequelize, User, Cart, CartItem, Product };