/* eslint-disable consistent-return */
/* eslint-disable no-console */

const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../database/connection');
const { verifyConnection } = require('../../database/verifyConnection');
const {
 getDateToday, getWeekAgo, existedWeekAgo, existedthreeMonthskAgo, getMonthsAgo,
} = require('../../helpers/dates');
const { responseMsg } = require('../../helpers/responseMsg');
const { responseServerError } = require('../../helpers/responseServerError');
const { getUidByToken } = require('../../jwt/getUidByToken');
const Reminder = require('../../models/Reminder');

const getStat = async (req, res) => {
    console.log('POST stats');

    const { idReminder } = req.params;
    const uid = getUidByToken(req.headers.authtoken);

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

    const isConnected = await verifyConnection();
    if (!isConnected) {
        return responseServerError(res);
    }

    // Stat of the day

    const stats = {
        today: {
            haveStats: false,
            accepted: 0,
        },
        week: {
            haveStats: false,
            accepted: 0,
        },
        months: {
            haveStats: false,
            accepted: 0,
        },
    };

    const statDay = await sequelize.query(`SELECT * FROM Stats where  uid = '${uid}' AND idReminder = ${idReminder} AND fecha = '${getDateToday()}';`, { type: QueryTypes.SELECT });
    if (statDay.length === 0) {
        stats.today = {
            haveStats: false,
            accepted: 0,
        };
    } else {
        stats.today = {
            haveStats: true,
            accepted: statDay[0].aceptadas,
            goal: statDay[0].meta,
        };
    }
    // Week
    if (!existedWeekAgo(reminder.createdAt)) {
        return responseMsg(res, 200, true, 'Stats', stats);
    }

    const statWeek = await sequelize.query(`SELECT * FROM Stats where  uid = '${uid}' AND idReminder = ${idReminder} AND fecha > '${getWeekAgo()}';`, { type: QueryTypes.SELECT });

    if (statWeek.length === 0) {
        stats.week = {
            haveStats: true,
            accepted: 0,
            porcentage: 0,
        };
    } else {
        const totalGoal = statWeek[0].meta * 7;
        let accepted = 0;
        statWeek.forEach((week) => {
            accepted += week.aceptadas;
        });

        const porcentage = accepted / totalGoal;

        stats.week = {
            haveStats: true,
            porcentage,
            accepted,
        };
    }
    // 3 months
    if (!existedthreeMonthskAgo(reminder.createdAt)) {
        return responseMsg(res, 200, true, 'Stats', stats);
    }

    const statMonths = await sequelize.query(`SELECT * FROM Stats where  uid = '${uid}' AND idReminder = ${idReminder} AND fecha > '${getMonthsAgo()}';`, { type: QueryTypes.SELECT });

    if (statMonths.length === 0) {
        stats.months = {
            haveStats: true,
            accepted: 0,
            porcentage: 0,
        };
    } else {
        const totalGoal = statMonths[0].meta * 90;
        let accepted = 0;
        statMonths.forEach((months) => {
            accepted += months.aceptadas;
        });

        const porcentage = accepted / totalGoal;

        stats.months = {
            haveStats: true,
            porcentage,
            accepted,
        };
    }

    return responseMsg(res, 200, true, 'Stats', stats);
};

module.exports = {
    getStat,
};
