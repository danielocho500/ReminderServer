const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

const Todo = sequelize.define('Todo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    uid: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    completed: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0,
    },
});

module.exports = Todo;
