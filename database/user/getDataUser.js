const { getUidByToken } = require('../../jwt/getUidByToken');
const User = require('../../models/User');

const getDataUser = async (token) => {
    const uid = await getUidByToken(token);

    const user = await User.findOne({ where: { uid } });

    const { emailconfirmed, isregistered, username } = user.dataValues;

    if (!user) {
        return {
            valid: false,
            data: false,
        };
    }

    return {
        valid: true,
        userDataComplete: true,
        data: {
            emailconfirmed,
            isregistered,
            username,
        },
    };
};

module.exports = {
    getDataUser,
};
