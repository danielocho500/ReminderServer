const { createUser } = require('../database/user/createUser');
const { emailExists } = require('../database/user/emailExists');
const { verifyConnection } = require('../database/verifyConnection');
const { getRequestData } = require('../helpers/getRequestData');
const { generateJWT } = require('../jwt/generateJWT');

/* eslint-disable no-console */
const authRegister = async (req, res) => {
    console.log('POST register');

    const { email, password } = req.body;
    const { userAgent, userIp } = getRequestData(req);

    const isConnected = await verifyConnection();
    if (!isConnected) {
        return res.status(500).json({
            ok: false,
            msg: 'internal server error',
            data: {
                registered: false,
            },
        });
    }

    const validEmail = await emailExists(email);
    if (!validEmail) {
        return res.status(401).json({
            ok: true,
            msg: 'email already registered',
            data: {
                registered: false,
            },
        });
    }

    try {
        const user = await createUser(password, email);

        const token = await generateJWT(user.uid, userAgent, userIp);
        res.set('authToken', token);

        return res.status(200).json({
            ok: true,
            data: {
                registered: true,
            },
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: 'internal server error',
            data: {
                registered: false,
            },
        });
    }
};

module.exports = {
    authRegister,
};
