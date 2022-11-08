const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

const ReminderWater = sequelize.define('ReminderWater', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    uid: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    hourBegin: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    hourEnd: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = ReminderWater;
