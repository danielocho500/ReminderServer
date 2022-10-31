const { getDataUser } = require('../database/user/getDataUser');

/* eslint-disable no-console */
const getUserInfo = async (req, res) => {
    console.log('GET User Info');

    const token = req.headers.authtoken;
    const dataUser = await getDataUser(token);

    if (dataUser.valid) {
        return res.status(200).json({
            ok: true,
            userData: {
                ...dataUser.data,
            },
        });
    }

    return res.status(401).json({
        ok: false,
        msg: 'No valid user',
    });
};

module.exports = {
    getUserInfo,
};
