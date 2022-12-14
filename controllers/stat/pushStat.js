/* eslint-disable consistent-return */
/* eslint-disable no-console */
const { verifyConnection } = require('../../database/verifyConnection');
const { getDateToday } = require('../../helpers/dateToday');
const { getNumberRings } = require('../../helpers/getNumberRings');
const { responseMsg } = require('../../helpers/responseMsg');
const { responseServerError } = require('../../helpers/responseServerError');
const { getUidByToken } = require('../../jwt/getUidByToken');
const Reminder = require('../../models/Reminder');
const Stat = require('../../models/Stat');

const pushStat = async (req, res) => {
    console.log('POST Stat');

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

    const statFind = await Stat.findOne({
        where: {
            idReminder,
            fecha: new Date(),
        },
    });

    console.log(statFind);

    // if (!statFind) {
    //     const { hourBegin, hourEnd, minutesLapse } = reminder;
    //     const meta = getNumberRings(hourBegin, hourEnd, minutesLapse);

    //     await Stat.create({
    //         idReminder,
    //         meta,
    //         aceptadas: 1,
    //         fecha: getDateToday(),
    //     });
    // }

    responseMsg(res, 200, true, 'uwu', {});
};

module.exports = {
    pushStat,
};
