/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
class Hour {
    hours = 0;

    minutes = 0;

    constructor(hour) {
        this.hours = parseInt(hour.split(':')[0], 10);
        this.minutes = parseInt(hour.split(':')[1], 10);
    }
}

const checkHourValid = (begin, end) => {
    const hourBegin = new Hour(begin);
    const hourEnd = new Hour(end);

    if (hourBegin.hours === hourEnd.hours && hourBegin.minutes >= hourEnd.minutes) {
        return false;
    }

    if (hourBegin.hours > hourEnd.hours) {
        return false;
    }

    return true;
};

module.exports = {
    checkHourValid,
};
