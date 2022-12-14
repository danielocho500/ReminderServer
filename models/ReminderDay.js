const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

const ReminderDay = sequelize.define('ReminderDay', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    reminderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = ReminderDay;
