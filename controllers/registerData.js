const { verifyConnection } = require('../database/verifyConnection');
const { getUidByToken } = require('../jwt/getUidByToken');
const User = require('../models/User');
const UserData = require('../models/UserData');
/* eslint-disable no-console */
const registerData = async (req, res) => {
    console.log('POST register data');

    const uid = getUidByToken(req.headers.authtoken);

    const {
        username,
        weight,
        height,
        genre,
        activity,
    } = req.body;

    const isConnected = await verifyConnection();
    if (!isConnected) {
        return res.status(500).json({
            ok: false,
            msg: 'internal server error',
        });
    }

    try {
        const uidExists = await UserData.findOne({ where: { uid } });

        if (uidExists) {
            return res.status(500).json({
                ok: false,
                msg: 'User data already registered',
            });
        }

        await UserData.create({
            uid,
            username,
            weight,
            height,
            genre,
            activity,
        });

        await User.update(
            { isregistered: 1 },
            { where: { uid } },
        );

        return res.status(200).json({
            ok: true,
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
    registerData,
};
