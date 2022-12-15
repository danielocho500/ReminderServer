/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
/* eslint-disable consistent-return */
const { verifyConnection } = require('../../database/verifyConnection');
const { getSeconds } = require('../../helpers/getSecondsHour');
const { responseMsg } = require('../../helpers/responseMsg');
const { responseServerError } = require('../../helpers/responseServerError');
const { getUidByToken } = require('../../jwt/getUidByToken');
const Reminder = require('../../models/Reminder');

/* eslint-disable no-console */
const getRemindersHours = async (req, res) => {
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

    const data = [];

    reminders.forEach((reminder) => {
        const begin = getSeconds(reminder.getDataValue('hourBegin'));
        const end = getSeconds(reminder.getDataValue('hourEnd'));
        const loop = reminder.getDataValue('minutesLapse') * 60;
        const lapse = end - begin;
        const rings = Math.floor(lapse / loop);

        for (let i = 0; i < rings; i++) {
            const seconds = begin + (loop * i);
            for (let j = 0; j < data.length; j++) {
                if (seconds < data[j].seconds) {
                    data.splice(j, 0, {
                        idReminder: reminder.getDataValue('id'),
                        name: reminder.getDataValue('name'),
                        seconds,
                    });
                    j = data.length;
                } else if (j === data.length - 1) {
                    data[data.length] = {
                        idReminder: reminder.getDataValue('id'),
                        name: reminder.getDataValue('name'),
                        seconds,
                    };
                    j = data.length;
                }
            }
            if (data.length === 0) {
                data.push({
                    idReminder: reminder.getDataValue('id'),
                    name: reminder.getDataValue('name'),
                    seconds,
                });
            }
        }
    });

    return responseMsg(res, 200, true, '', {
        reminders: data,
        length: data.length,
    });
};

module.exports = {
    getRemindersHours,
};
