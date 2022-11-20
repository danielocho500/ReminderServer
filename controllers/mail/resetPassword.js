/* eslint-disable consistent-return */
/* eslint-disable no-console */
const { verifyConnection } = require('../../database/verifyConnection');
const { encryptString } = require('../../helpers/encrypt');
const { responseMsg } = require('../../helpers/responseMsg');
const { responseServerError } = require('../../helpers/responseServerError');
const Pin = require('../../models/Pin');
const User = require('../../models/User');

const resetPassword = async (req, res) => {
    console.log('POST reset password');

    const { pin } = req.params;
    const { password } = req.body;

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

            const hashedPass = await encryptString(password);

            await user.update({
                password: hashedPass,
            });

            return responseMsg(res, 200, true, 'passwordChanged', {});
        }

        return responseMsg(res, 400, true, 'the pin does not exist', {});
    } catch (err) {
        console.log(err);
        return responseServerError(res);
    }
};

module.exports = {
    resetPassword,
};
