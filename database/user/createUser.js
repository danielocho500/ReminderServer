const { encryptString } = require('../../helpers/encrypt');
const { generateUID } = require('../../helpers/generateUid');
const User = require('../../models/User');

const createUser = async (password, email, username) => {
    const hashedPass = await encryptString(password);
    const uid = await generateUID();

    const user = await User.create({
        uid,
        password: hashedPass,
        username,
        email,
        emailconfirmed: 0,
        isregistered: 0,
    });

    return user;
};

module.exports = {
    createUser,
};
