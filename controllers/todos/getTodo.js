/* eslint-disable consistent-return */
/* eslint-disable no-console */
const { verifyConnection } = require('../../database/verifyConnection');
const { responseMsg } = require('../../helpers/responseMsg');
const { responseServerError } = require('../../helpers/responseServerError');
const { getUidByToken } = require('../../jwt/getUidByToken');
const Todo = require('../../models/Todo');

const getTodo = async (req, res) => {
    console.log('GET todo');

    const { idTodo } = req.params;
    const uid = getUidByToken(req.headers.authtoken);

    const isConnected = await verifyConnection();
    if (!isConnected) {
        return responseServerError(res);
    }

    const todo = await Todo.findOne({
        where: {
            uid,
            id: idTodo,
        },
    });

    if (!todo) {
        return responseMsg(res, 404, true, 'todo not found', {});
    }

    const { description, endDate, completed } = todo;

    const date = new Date(endDate).getTime();

    return responseMsg(res, 200, true, '', { description, endDate: date, completed });
};

module.exports = {
    getTodo,
};
