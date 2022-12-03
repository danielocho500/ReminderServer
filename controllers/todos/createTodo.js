/* eslint-disable no-console */
const { verifyConnection } = require('../../database/verifyConnection');
const { responseMsg } = require('../../helpers/responseMsg');
const { responseServerError } = require('../../helpers/responseServerError');
const { getUidByToken } = require('../../jwt/getUidByToken');
const Todo = require('../../models/Todo');

const createTodo = async (req, res) => {
    console.log('POST Todo');

    const {
        description,
        endDate,
    } = req.body;

    if ((endDate < Date.now())) {
        return responseMsg(res, 400, true, 'La fecha de termino debe ser mayor a la actual', {});
    }

    const uid = getUidByToken(req.headers.authtoken);

    const isConnected = await verifyConnection();
    if (!isConnected) {
        return responseServerError(res);
    }

    try {
        await Todo.create({
            description,
            uid,
            endDate,
        });

        return responseMsg(res, 200, true, '', {
            created: true,
        });
    } catch (err) {
        console.log(err);
        return responseServerError(res);
    }
};

module.exports = {
    createTodo,
};
