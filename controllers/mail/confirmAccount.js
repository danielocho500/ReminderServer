/* eslint-disable consistent-return */
/* eslint-disable no-console */
const { verifyConnection } = require('../../database/verifyConnection');
const { responseMsg } = require('../../helpers/responseMsg');
const { responseServerError } = require('../../helpers/responseServerError');
const Pin = require('../../models/Pin');
const User = require('../../models/User');

const confirmAccount = async (req, res) => {
    console.log('POST confirm Account');

    const { pin } = req.params;

    const isConnected = await verifyConnection();
    if (!isConnected) {
        return responseServerError(res);
    }

    try {
        const pinDB = await Pin.findOne({ where: { value: pin } });
        if (pinDB) {
            const { uid } = pinDB.dataValues;
            Pin.destroy({ where: { id: pinDB.dataValues.id } });

            const user = await User.findOne({ where: { uid } });

            await user.update({
                emailconfirmed: 1,
            });

            return responseMsg(res, 200, true, 'User Email Verified', {});
        }

        return responseMsg(res, 400, true, 'the pin does not exist', {});
    } catch (err) {
        console.log(err);
        return responseServerError(res);
    }
};

module.exports = {
    confirmAccount,
};
