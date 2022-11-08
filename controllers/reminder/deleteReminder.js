/* eslint-disable consistent-return */
/* eslint-disable no-console */
const { verifyConnection } = require('../../database/verifyConnection');
const { responseMsg } = require('../../helpers/responseMsg');
const { responseServerError } = require('../../helpers/responseServerError');
const { getUidByToken } = require('../../jwt/getUidByToken');
const Reminder = require('../../models/Reminder');

const deleteReminder = async (req, res) => {
    console.log('DELETE reminder');

    const { idReminder } = req.params;
    const uid = getUidByToken(req.headers.authtoken);

    const isConnected = await verifyConnection();
    if (!isConnected) {
        return responseServerError(res);
    }

    try {
        const reminder = await Reminder.findOne({
            where: {
                uid,
                id: idReminder,
            },
        });

        if (!reminder) {
            return responseMsg(res, 404, true, 'Reminder not found', {});
        }

        reminder.update({
            isActive: 0,
        });

        return responseMsg(res, 200, true, 'deleted', {});
    } catch {
        return responseServerError(res);
    }
};

module.exports = {
    deleteReminder,
};
