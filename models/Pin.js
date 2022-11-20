const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

const Pin = sequelize.define('Pin', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Pin;
