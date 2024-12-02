import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userType: {
        type: DataTypes.ENUM('administrator', 'client', 'teacher'),
        allowNull: false,
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
    tableName: 'user',
    timestamps: false,
});

export default User;