/* eslint-disable no-else-return */
require('dotenv').config();
const mysql = require('mysql2');
const { loginQuery } = require('./querys');

const loginAuth = async (email, pass) => new Promise((resolve, reject) => {
        const connection = mysql.createConnection(process.env.DATABASE_URL);

        connection.connect();
        connection.query(loginQuery(email, pass), (err, rows) => {
        if (err || rows === undefined) {
            // eslint-disable-next-line prefer-promise-reject-errors
            return reject({
                ok: false,
            });
        }

        if (rows.length > 0) {
            connection.end();
            return resolve({
                ok: true,
                logged: true,
                uid: rows[0].Uid,
            });
        } else {
            connection.end();
            return resolve({
                ok: true,
                logged: false,
                msg: 'Incorrect credentials',
            });
        }
        });
    });

module.exports = {
    loginAuth,
};
