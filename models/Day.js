const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

const Day = sequelize.define('Day', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Day;
