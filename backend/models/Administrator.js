import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Administrator = sequelize.define('Administrator', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'id',
        },
    },
}, {
    tableName: 'administrator',
    timestamps: false,
});

Administrator.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Administrator, { foreignKey: 'userId', constraints: false, scope: { userType: 'administrator' } });

export default Administrator;