/* eslint-disable no-console */
const { verifyConnection } = require('../../database/verifyConnection');
const { checkHourValid } = require('../../helpers/checkHourValid');
const { responseMsg } = require('../../helpers/responseMsg');
const { responseServerError } = require('../../helpers/responseServerError');
const { getUidByToken } = require('../../jwt/getUidByToken');
const Reminder = require('../../models/Reminder');

const createReminder = async (req, res) => {
    console.log('POST reminder');

    const {
        name,
        hourBegin,
        hourEnd,
        repetitions,
    } = req.body;

    const uid = getUidByToken(req.headers.authtoken);

    if (!checkHourValid(hourBegin, hourEnd)) {
        responseMsg(res, 400, true, 'The hour End should be an hour after the hour begin at least', {});
    }

    const isConnected = await verifyConnection();
    if (!isConnected) {
        return responseServerError(res);
    }

    try {
        await Reminder.create({
            uid,
            name,
            hourBegin,
            hourEnd,
            repetitions,
        });

        return responseMsg(res, 200, true, {
            created: true,
        });
    } catch (err) {
        console.log(err);
        return responseServerError(res);
    }
};

module.exports = {
    createReminder,
};
