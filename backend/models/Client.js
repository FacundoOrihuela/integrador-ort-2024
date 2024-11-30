import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Client = sequelize.define('Client', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'id',
        },
    },
    membership: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
    },
}, {
    tableName: 'client',
    timestamps: false,
});

Client.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Client, { foreignKey: 'userId', constraints: false, scope: { userType: 'client' } });

export default Client;