const { v4: uuidv4 } = require('uuid');

const generateUID = () => {
    const uid = uuidv4();
    return uid;
};

module.exports = {
    generateUID,
};
