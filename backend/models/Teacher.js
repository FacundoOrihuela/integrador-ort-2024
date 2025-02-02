import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Teacher = sequelize.define('Teacher', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'id',
        },
    },
    specialty: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
}, {
    tableName: 'teacher',
    timestamps: false,
});

Teacher.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Teacher, { foreignKey: 'userId', constraints: false, scope: { userType: 'teacher' } });

export default Teacher;