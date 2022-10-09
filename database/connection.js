require('dotenv').config();

const connectionData = {
  host: process.env.HOST,
  user: process.env.USERDB,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

module.exports = {
    connectionData,
};
