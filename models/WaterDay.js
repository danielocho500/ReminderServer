const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

const WaterDay = sequelize.define('WaterDay', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    idReminder: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    goal: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    consumend: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = WaterDay;
