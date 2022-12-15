const { verifyConnection } = require('../../database/verifyConnection');
const { responseMsg } = require('../../helpers/responseMsg');
const { responseServerError } = require('../../helpers/responseServerError');
const { getUidByToken } = require('../../jwt/getUidByToken');
const User = require('../../models/User');
const UserData = require('../../models/UserData');
/* eslint-disable no-console */
const registerData = async (req, res) => {
    console.log('POST register data');

    const uid = getUidByToken(req.headers.authtoken);

    const {
        weight,
        height,
        genre,
        activity,
    } = req.body;

    const isConnected = await verifyConnection();
    if (!isConnected) {
        return responseServerError(res);
    }

    try {
        const uidExists = await UserData.findOne({ where: { uid } });

        if (uidExists) {
            return responseMsg(res, 401, true, 'No valid user', {});
        }

        await UserData.create({
            uid,
            weight,
            height,
            genre,
            activity,
        });

        await User.update(
            { isregistered: 1 },
            { where: { uid } },
        );

        return responseMsg(res, 200, true, 'Data registered', {});
    } catch (err) {
        console.log(err);
        return responseServerError(res);
    }
};

module.exports = {
    registerData,
};
