/* eslint-disable consistent-return */
/* eslint-disable no-console */
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../database/connection');
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

    const statFind = await sequelize.query(`SELECT * FROM stats WHERE fecha = '${getDateToday()}' AND uid = '${uid}' AND idReminder = '${idReminder}';`, { type: QueryTypes.SELECT });

    console.log(statFind);

    if (statFind.length === 0) {
        const { hourBegin, hourEnd, minutesLapse } = reminder;
        const meta = getNumberRings(hourBegin, hourEnd, minutesLapse);

        await Stat.create({
            idReminder,
            meta,
            aceptadas: 1,
            fecha: getDateToday(),
        });
    } else {
        const idStat = statFind[0].id;
        const stat = await Stat.findOne({
            where: {
                id: idStat,
            },
        });

        await stat.update({
            aceptadas: stat.dataValues.aceptadas + 1,
        });
    }

    return responseMsg(res, 200, true, 'updated', {});
};

module.exports = {
    pushStat,
};
