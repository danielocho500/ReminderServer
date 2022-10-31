/* eslint-disable no-console */
const { verifyConnection } = require('../database/verifyConnection');
const { checkPassword } = require('../helpers/checkPassword');
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
            data: {
                logged: false,
            },
        });
    }

    const user = await User.findOne({ where: { email } });
    const ismatch = await checkPassword(password, user.password);

    if (!user || !ismatch) {
        return res.status(401).json({
            ok: true,
            msg: 'The credentials are incorrect',
            userData: {
                logged: false,
            },
        });
    }

    try {
        const token = await generateJWT(user.uid, userAgent, userIp);

        return res.status(200).json({
            ok: true,
            userData: {
                emailconfirmed: user.emailconfirmed,
                isregistered: user.isregistered,
                logged: true,
            },
            token,
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
