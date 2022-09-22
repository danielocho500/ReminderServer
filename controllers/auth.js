const { loginAuth } = require("../database/auth");

const authLogin = (req, res) => {
    const {email, password } = req.body;

    console.log('POST Login');

    loginAuth(email, password)
    .then(data => {
        return res.json({
            ok: data
        })
    })
    .catch(err => {
        return res.status(500).json({
            ok: false
        })
    })
}

module.exports = {
    authLogin
}