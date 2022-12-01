/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
/* eslint-disable consistent-return */
const { verifyConnection } = require('../../database/verifyConnection');
const { responseMsg } = require('../../helpers/responseMsg');
const { responseServerError } = require('../../helpers/responseServerError');
const { getUidByToken } = require('../../jwt/getUidByToken');
const Image = require('../../models/Image');
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

    const data = [];

    let i = 0;
    while (i < reminders.length) {
        const { url } = await Image.findOne({
            where: {
                id: reminders[i].image,
            },
        });

        data.push({
            id: reminders[i].dataValues.id,
            name: reminders[i].dataValues.name,
            hourBegin: reminders[i].dataValues.hourBegin,
            hourEnd: reminders[i].dataValues.hourEnd,
            minutesLapse: reminders[i].dataValues.minutesLapse,
            updatedAt: reminders[i].dataValues.updatedAt,
            createdAt: reminders[i].dataValues.createdAt,
            url,
            image: reminders[i].dataValues.image,
        });

        i++;
    }

    return responseMsg(res, 200, true, '', {
        reminders: data,
        length: data.length,
    });
};

module.exports = {
    getReminders,
};
