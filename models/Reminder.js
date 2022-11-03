const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

const Reminder = sequelize.define('Reminder', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    uid: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hourBegin: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    hourEnd: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    repetitions: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Reminder;
