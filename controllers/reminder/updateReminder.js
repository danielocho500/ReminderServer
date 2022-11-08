/* eslint-disable consistent-return */
/* eslint-disable no-console */
const { verifyConnection } = require('../../database/verifyConnection');
const { checkHourValid } = require('../../helpers/checkHourValid');
const { responseMsg } = require('../../helpers/responseMsg');
const { responseServerError } = require('../../helpers/responseServerError');
const { getUidByToken } = require('../../jwt/getUidByToken');
const Reminder = require('../../models/Reminder');

const updateReminder = async (req, res) => {
    console.log('PUT reminder');

    const {
        name,
        hourBegin,
        hourEnd,
        repetitions,
    } = req.body;

    if (!checkHourValid(hourBegin, hourEnd)) {
        return responseMsg(res, 400, true, 'The hour End should be an hour after the hour begin at least', {});
    }

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
            name,
            hourBegin,
            hourEnd,
            repetitions,
        });

        return responseMsg(res, 200, true, 'updated', {});
    } catch {
        return responseServerError(res);
    }
};

module.exports = {
    updateReminder,
};
