import sequelize from '../config/database.js';
import User from './User.js';
import Cart from './Cart.js';
import CartItem from './CartItem.js';
import Product from './Product.js';
import Event from './Event.js';
import SingleEvent from './SingleEvent.js';
import RecurringEvent from './RecurringEvent.js';
import EventRegistration from './EventRegistration.js';
import Order from './Order.js';
import OrderItem from './OrderItem.js';
import Rating from './Rating.js';
import Category from './Category.js';
import Favorite from './Favorite.js';
import Group from './Group.js';
import Post from './Post.js';
import GroupUser from './GroupUser.js';
import Comment from './Comment.js';

// Definir relaciones
User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

Cart.hasMany(CartItem, { foreignKey: 'cartId' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

Product.hasMany(CartItem, { foreignKey: 'productId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });

Event.hasOne(SingleEvent, { foreignKey: 'eventId' });
SingleEvent.belongsTo(Event, { foreignKey: 'eventId' });

Event.hasOne(RecurringEvent, { foreignKey: 'eventId' });
RecurringEvent.belongsTo(Event, { foreignKey: 'eventId' });

User.belongsToMany(Event, { through: EventRegistration, foreignKey: 'userId' });
Event.belongsToMany(User, { through: EventRegistration, foreignKey: 'eventId' });

EventRegistration.belongsTo(User, { foreignKey: 'userId' });
EventRegistration.belongsTo(Event, { foreignKey: 'eventId' });

Order.belongsTo(User, { foreignKey: 'userId' });
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

Product.hasMany(Rating, { foreignKey: 'productId' });
Rating.belongsTo(Product, { foreignKey: 'productId' });

User.hasMany(Rating, { foreignKey: 'userId' });
Rating.belongsTo(User, { foreignKey: 'userId' });

Product.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Product, { foreignKey: 'categoryId' });

// Definir relaciones para favoritos
User.hasMany(Favorite, { foreignKey: 'userId' });
Product.hasMany(Favorite, { foreignKey: 'productId' });
Favorite.belongsTo(User, { foreignKey: 'userId' });
Favorite.belongsTo(Product, { foreignKey: 'productId' });

// Definir las asociaciones
User.belongsToMany(Group, { through: GroupUser, foreignKey: 'userId' });
Group.belongsToMany(User, { through: GroupUser, foreignKey: 'groupId' });

User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

Group.hasMany(Post, { foreignKey: 'groupId' });
Post.belongsTo(Group, { foreignKey: 'groupId' });

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

export { sequelize, User, Cart, CartItem, Product, Event, SingleEvent, RecurringEvent, EventRegistration, Order, OrderItem, Rating, Category, Favorite, Group, Post, GroupUser, Comment };