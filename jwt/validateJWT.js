require('dotenv').config();
const jwt = require('jsonwebtoken');
const { getRequestData } = require('../helpers/getRequestData');

// eslint-disable-next-line consistent-return
const validateJWT = async (req, res, next) => {
    const token = req.header('authToken');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'There is no token in the header',
        });
    }

    try {
        // eslint-disable-next-line no-unused-vars, max-len
        const { userAgent: userAgentToken, userIp: userIpToken } = jwt.verify(token, process.env.SECRET_KEY);

        const { userAgent, userIp } = getRequestData(req);

        if (userAgent === userAgentToken && userIp === userIpToken) {
            next();
        } else {
            return res.status(401).json({
                ok: false,
                msg: 'invalid token',
            });
        }
    } catch (err) {
        return res.status(401).json({
            ok: false,
            msg: 'No valid Token',
        });
    }
};

module.exports = {
    validateJWT,
};
