const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

const Reminder = sequelize.define('Reminder', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    minutesLapse: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    image: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    isActive: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 1,
    },
});

module.exports = Reminder;
