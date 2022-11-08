const { getDataUser } = require('../../database/user/getDataUser');
const { verifyConnection } = require('../../database/verifyConnection');
const { responseMsg } = require('../../helpers/responseMsg');
const { responseServerError } = require('../../helpers/responseServerError');

/* eslint-disable no-console */
const getUserInfo = async (req, res) => {
    console.log('GET User Info');

    const token = req.headers.authtoken;
    const isConnected = await verifyConnection();
    if (!isConnected) {
        return responseServerError(res);
    }
    const dataUser = await getDataUser(token);

    if (dataUser.valid) {
        return responseMsg(res, 200, true, '', {
            ...dataUser.data,
        });
    }

    return responseMsg(res, 401, false, 'No valid user', {});
};

module.exports = {
    getUserInfo,
};
