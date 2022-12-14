const { verifyConnection } = require('../../database/verifyConnection');
const { responseMsg } = require('../../helpers/responseMsg');
const { responseServerError } = require('../../helpers/responseServerError');
const { getUidByToken } = require('../../jwt/getUidByToken');
const UserData = require('../../models/UserData');

/* eslint-disable no-console */
const getUserData = async (req, res) => {
    console.log('GET User Data');

    const token = req.headers.authtoken;
    const uid = getUidByToken(token);

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

    return responseMsg(res, 200, true, '', {
        weight: data.dataValues.weight,
        height: data.dataValues.height,
        genre: data.dataValues.genre,
        activity: data.dataValues.activity,
    });
};

module.exports = {
    getUserData,
};
