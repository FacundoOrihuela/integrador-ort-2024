import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Group from './Group.js';

const GroupUser = sequelize.define('GroupUser', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Group,
            key: 'id',
        },
    },
}, {
    tableName: 'group_user',
    timestamps: false,
});

export default GroupUser;