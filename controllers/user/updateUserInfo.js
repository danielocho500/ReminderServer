const { verifyConnection } = require('../../database/verifyConnection');
const { responseMsg } = require('../../helpers/responseMsg');
const { responseServerError } = require('../../helpers/responseServerError');
const { getUidByToken } = require('../../jwt/getUidByToken');
const UserData = require('../../models/UserData');

/* eslint-disable no-console */
const updateUserInfo = async (req, res) => {
    console.log('Patch User Info');

    const token = req.headers.authtoken;
    const uid = getUidByToken(token);

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

    const data = await UserData.findOne({
        where: {
            uid,
        },
    });

    if (!data) {
        return responseMsg(res, 400, true, 'There are not user data registered', {});
    }

    await data.update({
        weight,
        height,
        genre,
        activity,
    });

    return responseMsg(res, 200, true, 'User updated', {});
};

module.exports = {
    updateUserInfo,
};
