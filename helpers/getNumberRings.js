const getNumberRings = (hourBegin, hourEnd, minutesLapse) => {
    const secondsBegin = parseInt((hourBegin.split(':')[0] * 3600), 10) + parseInt((hourBegin.split(':')[1] * 60), 10) + parseInt((hourBegin.split(':')[2]), 10);
    const secondsEnd = parseInt((hourEnd.split(':')[0] * 3600), 10) + parseInt((hourEnd.split(':')[1] * 60), 10) + parseInt((hourEnd.split(':')[2]), 10);
    const totalSeconds = secondsEnd - secondsBegin;

    return Math.floor(totalSeconds / (minutesLapse * 60));
};

module.exports = {
    getNumberRings,
};
