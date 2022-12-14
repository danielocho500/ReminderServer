const { DataTypes } = require('sequelize');
const { seqUser } = require('../database/connection');

const User = seqUser.define('User', {
    uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    emailconfirmed: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isregistered: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = User;
