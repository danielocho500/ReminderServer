const responseMsg = (res, code, ok, msg, data) => res.status(code).json({
        ok,
        msg,
        data,
    });

module.exports = {
    responseMsg,
};
