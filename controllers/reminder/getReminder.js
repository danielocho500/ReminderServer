/* eslint-disable consistent-return */
/* eslint-disable no-console */
const { verifyConnection } = require('../../database/verifyConnection');
const { responseMsg } = require('../../helpers/responseMsg');
const { responseServerError } = require('../../helpers/responseServerError');
const { getUidByToken } = require('../../jwt/getUidByToken');
const Image = require('../../models/Image');
const Reminder = require('../../models/Reminder');

const getReminder = async (req, res) => {
    console.log('GET reminder');

    const { idReminder } = req.params;
    const uid = getUidByToken(req.headers.authtoken);

    const isConnected = await verifyConnection();
    if (!isConnected) {
        return responseServerError(res);
    }

    const reminder = await Reminder.findOne({
        where: {
            uid,
            id: idReminder,
            isActive: 1,
        },
    });

    if (!reminder) {
        return responseMsg(res, 404, true, 'Reminder not found', {});
    }

    const {
        name,
        hourBegin,
        hourEnd,
        minutesLapse,
        createdAt,
        updatedAt,
        image,
    } = reminder;
    console.log(image);

    const { url } = await Image.findOne({
        where: {
            id: image,
        },
    });

    return responseMsg(res, 200, true, '', {
        name, hourBegin, hourEnd, minutesLapse, createdAt, updatedAt, url,
    });
};

module.exports = {
    getReminder,
};
