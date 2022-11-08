const responseServerError = (res) => res.status(500).json({
        ok: false,
        msg: 'internal server error',
    });

module.exports = {
    responseServerError,
};
