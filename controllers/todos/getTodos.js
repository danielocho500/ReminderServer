/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const { verifyConnection } = require('../../database/verifyConnection');
const { responseMsg } = require('../../helpers/responseMsg');
const { responseServerError } = require('../../helpers/responseServerError');
const { getUidByToken } = require('../../jwt/getUidByToken');
const Todo = require('../../models/Todo');

const getTodos = async (req, res) => {
    console.log('GET todo');

    const uid = getUidByToken(req.headers.authtoken);

    const isConnected = await verifyConnection();
    if (!isConnected) {
        return responseServerError(res);
    }

    const todosActive = await Todo.findAll({
        where: {
            uid,
            completed: 0,
        },
        order: [
            ['endDate', 'ASC'],
        ],
    });

    const actives = todosActive.map((todo) => {
        const {
            id, description, endDate, completed,
        } = todo.dataValues;
        const date = new Date(endDate).getTime();

        const expired = (date <= Date.now());

        console.log(date);
        console.log(Date.now());

        return {
            id,
            description,
            endDate: date,
            completed,
            expired,
        };
    });

    return responseMsg(res, 200, true, '', {
        actives,
    });
};

module.exports = {
    getTodos,
};
