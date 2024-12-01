import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Membership = sequelize.define('Membership', {
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
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'memberships',
    timestamps: false,
});

export default Membership;