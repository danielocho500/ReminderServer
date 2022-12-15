require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
{
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    ssl: true,
    port: process.env.DB_PORT,
},
);

const seqUser = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME_User,
  process.env.DB_PASSWORD_User,
{
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    ssl: true,
    port: process.env.DB_PORT,
},
);

const seqPin = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME_Pin,
  process.env.DB_PASSWORD_Pin,
{
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    ssl: true,
    port: process.env.DB_PORT,
},
);

const seqReminder = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME_Reminder,
  process.env.DB_PASSWORD_Reminder,
{
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    ssl: true,
    port: process.env.DB_PORT,
},
);

const seqTodo = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME_Todo,
  process.env.DB_PASSWORD_Todo,
{
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    ssl: true,
    port: process.env.DB_PORT,
},
);

module.exports = {
    sequelize,
    seqUser,
    seqPin,
    seqReminder,
    seqTodo,
};
