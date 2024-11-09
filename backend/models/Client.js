import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Client = sequelize.define('Client', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    photo: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    membership: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
    },
    created: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    verificationToken: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    isVerified: {
        type: DataTypes.TINYINT(1),
        defaultValue: 0,
    },
    passwordResetToken: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    tableName: 'client',
    timestamps: false,
});

export default Client;