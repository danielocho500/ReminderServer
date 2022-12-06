/* eslint-disable no-console */
const { verifyConnection } = require('../../database/verifyConnection');
const { responseMsg } = require('../../helpers/responseMsg');
const { responseServerError } = require('../../helpers/responseServerError');
const { getUidByToken } = require('../../jwt/getUidByToken');
const Todo = require('../../models/Todo');

const completeTodo = async (req, res) => {
    console.log('DELETE Todo');

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
            return responseMsg(res, 404, true, 'todo not found', {});
        }

        todo.update({
            isActive: 0,
        });

        return responseMsg(res, 200, true, '', {
            deleted: true,
        });
    } catch (err) {
        console.log(err);
        return responseServerError(res);
    }
};

module.exports = {
   completeTodo,
};
