import sequelize from '../config/database.js';
import User from './User.js';
import Cart from './Cart.js';
import CartItem from './CartItem.js';
import Product from './Product.js';
import Event from './Event.js';
import SingleEvent from './SingleEvent.js';
import RecurringEvent from './RecurringEvent.js';
import EventRegistration from './EventRegistration.js';

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

export { sequelize, User, Cart, CartItem, Product, Event, SingleEvent, RecurringEvent, EventRegistration };