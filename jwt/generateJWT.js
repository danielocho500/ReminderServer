const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateJWT = (uid, userAgent, userIp) => new Promise((resolve, reject) => {
        const payload = { uid, userAgent, userIp };
        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '2d',
        }, (error, token) => {
            if (error) {
                // eslint-disable-next-line no-console
                console.log(error);
                // eslint-disable-next-line prefer-promise-reject-errors
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        });
    });

module.exports = {
    generateJWT,
};
