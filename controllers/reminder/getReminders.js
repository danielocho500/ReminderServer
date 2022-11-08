/* eslint-disable consistent-return */
const { verifyConnection } = require('../../database/verifyConnection');
const { responseMsg } = require('../../helpers/responseMsg');
const { responseServerError } = require('../../helpers/responseServerError');
const { getUidByToken } = require('../../jwt/getUidByToken');
const Reminder = require('../../models/Reminder');

/* eslint-disable no-console */
const getReminders = async (req, res) => {
    console.log('GET reminders');

    const isConnected = await verifyConnection();
    if (!isConnected) {
        return responseServerError(res);
    }

    const uid = getUidByToken(req.headers.authtoken);
    const reminders = await Reminder.findAll({
        where: {
            uid,
            isActive: 1,
        },
    });

    const data = reminders.map((reminder) => ({
        id: reminder.dataValues.id,
        name: reminder.dataValues.name,
        hourBegin: reminder.dataValues.hourBegin,
        hourEnd: reminder.dataValues.hourEnd,
        repetitions: reminder.dataValues.repetitions,
        updatedAt: reminder.dataValues.updatedAt,
        createdAt: reminder.dataValues.createdAt,
    }));

    return responseMsg(res, 200, true, '', {
        reminders: data,
        length: data.length,
    });
};

module.exports = {
    getReminders,
};
