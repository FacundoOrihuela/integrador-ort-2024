import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Group = sequelize.define('Group', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'group',
    timestamps: true,
});

export default Group;