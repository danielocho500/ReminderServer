require('dotenv').config();
const { Sequelize } = require('sequelize');

// PlaneScale
// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USERNAME,
//   process.env.DB_PASSWORD,
// {
//     host: process.env.DB_HOST,
//     dialect: 'mysql',
//     dialectOptions: {
//         ssl: {
//             rejectUnauthorized: true,
//         },
//     },
// },
// );

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
{
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
},
);

module.exports = {
    sequelize,
};
