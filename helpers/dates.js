const moment = require('moment');

const getDateToday = () => {
    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
};

const getWeekAgo = () => {
    const weekAgo = moment().subtract(7, 'days');
    return `${weekAgo.year()}-${weekAgo.month() + 1}-${weekAgo.date()}`;
};

const getMonthsAgo = () => {
    const weekAgo = moment().subtract(3, 'months');
    return `${weekAgo.year()}-${weekAgo.month() + 1}-${weekAgo.date()}`;
};

const existedWeekAgo = (date) => {
    const dateCreated = moment(date);
    const weekAgo = moment().subtract(7, 'days');
    return dateCreated.isBefore(weekAgo);
};

const existedthreeMonthskAgo = (date) => {
    const dateCreated = moment(date);
    const monthsAgo = moment().subtract(3, 'months');
    return dateCreated.isBefore(monthsAgo);
};

module.exports = {
    getDateToday,
    getWeekAgo,
    existedWeekAgo,
    existedthreeMonthskAgo,
    getMonthsAgo,
};
