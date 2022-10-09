require('dotenv').config();
const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
const validateJWT = async (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'There is no token in the header',
        });
    }

    try {
        // eslint-disable-next-line no-unused-vars
        const { uid } = jwt.verify(token, process.env.SECRET_KEY);

        next();
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
