const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

const Stats = sequelize.define('Stats', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: 1,
    },
    uid: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idReminder: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    meta: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    aceptadas: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

module.exports = Stats;
