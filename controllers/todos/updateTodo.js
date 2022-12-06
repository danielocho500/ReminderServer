/* eslint-disable consistent-return */
/* eslint-disable no-console */
const { verifyConnection } = require('../../database/verifyConnection');
const { responseMsg } = require('../../helpers/responseMsg');
const { responseServerError } = require('../../helpers/responseServerError');
const { getUidByToken } = require('../../jwt/getUidByToken');
const Todo = require('../../models/Todo');

const updateTodo = async (req, res) => {
    console.log('PUT reminder');

    const {
        description,
        endDate,
    } = req.body;

    if ((endDate < Date.now())) {
        return responseMsg(res, 400, true, 'La fecha de termino debe ser mayor a la actual', {});
    }

    const { idTodo } = req.params;
    const uid = getUidByToken(req.headers.authtoken);

    const isConnected = await verifyConnection();
    if (!isConnected) {
        return responseServerError(res);
    }

    try {
        const todo = await Todo.findOne({
            where: {
                uid,
                id: idTodo,
                isActive: 1,
            },
        });

        if (!todo) {
            return responseMsg(res, 404, true, 'ToDo not found', {});
        }

        todo.update({
            description,
            endDate,
        });

        return responseMsg(res, 200, true, 'updated', {});
    } catch {
        return responseServerError(res);
    }
};

module.exports = {
    updateTodo,
};
