import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Membership from './Membership.js';

const Client = sequelize.define('Client', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'id',
        },
    },
    membershipId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Membership,
            key: 'id',
        },
    },
}, {
    tableName: 'client',
    timestamps: false,
});

Client.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Client, { foreignKey: 'userId', constraints: false, scope: { userType: 'client' } });

Client.belongsTo(Membership, { foreignKey: 'membershipId' });
Membership.hasMany(Client, { foreignKey: 'membershipId' });

export default Client;