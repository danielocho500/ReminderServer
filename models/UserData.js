const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

const UserData = sequelize.define('UserDatas', {
    uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    height: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    activity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

module.exports = UserData;
