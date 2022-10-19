/* eslint-disable no-console */
const { verifyConnection } = require('../database/verifyConnection');
const { getRequestData } = require('../helpers/getRequestData');
const { generateJWT } = require('../jwt/generateJWT');
const User = require('../models/User');

const authLogin = async (req, res) => {
    console.log('POST Login');

    const { email, password } = req.body;
    const { userAgent, userIp } = getRequestData(req);

    const isConnected = await verifyConnection();
    if (!isConnected) {
        return res.status(500).json({
            ok: false,
            msg: 'internal server error',
            logged: false,
        });
    }

    const user = await User.findOne({ where: { email, password } });

    if (!user) {
        return res.status(401).json({
            ok: true,
            msg: 'The credentials are incorrect',
            logged: false,
        });
    }

    try {
        const token = await generateJWT(user.uid, userAgent, userIp);
        res.set('authToken', token);

        return res.status(200).json({
            ok: true,
            logged: true,
            userData: {
                emailconfirmed: user.emailconfirmed,
                isregistered: user.isregistered,
            },
        });
    } catch {
        return res.status(500).json({
            ok: false,
            msg: 'internal server error',
        });
    }
};

module.exports = {
    authLogin,
};
