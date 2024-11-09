import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Teacher = sequelize.define('Teacher', {
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
    created: {
        type: DataTypes.STRING(45),
        defaultValue: 'CURRENT_TIMESTAMP',
    },
    specialty: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(500),
        allowNull: true,
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
    tableName: 'teacher',
    timestamps: false,     
});

export default Teacher;