require('dotenv').config()

const connectionData = {
  host: process.env.HOST,
  user: process.env.USERDB,
  password: process.env.USERDB,
  database: process.env.DATABASE
}

module.exports = {
    connectionData
}