/* eslint-disable no-param-reassign */
const { loginAuth } = require('../database/auth');
const { generateJWT } = require('../jwt/generateJWT');

const authLogin = (req, res) => {
  const { email, password } = req.body;

  // eslint-disable-next-line no-console
  console.log('POST Login');

  loginAuth(email, password)
    .then(async (data) => {
        if (data.uid) {
            const token = await generateJWT(data.uid);
            data = {
                ...data,
                token,
            };
        }

        return res.json({
            data,
        });
    })
    .catch(() => res.status(500).json({
            ok: false,
            msg: 'internal server error',
        }));
};

module.exports = {
    authLogin,
};
