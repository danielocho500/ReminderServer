const { DataTypes } = require('sequelize');
const { seqTodo } = require('../database/connection');

const Todo = seqTodo.define('Todo', {
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
    isActive: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 1,
    },
});

module.exports = Todo;
