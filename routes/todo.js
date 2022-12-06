const { Router } = require('express');
const { check } = require('express-validator');
const { completeTodo } = require('../controllers/todos/completeTodo');
const { createTodo } = require('../controllers/todos/createTodo');
const { getTodo } = require('../controllers/todos/getTodo');
const { getTodos } = require('../controllers/todos/getTodos');
const { updateTodo } = require('../controllers/todos/updateTodo');
const { validateParams } = require('../helpers/validateParams');
const { validateJWT } = require('../jwt/validateJWT');

const router = Router();

router.post('/', [
    check('description', 'You should include a valid description').notEmpty(),
    check('endDate', 'You should include the endDate').notEmpty().isNumeric(),
    validateParams,
    validateJWT,
], createTodo);

router.put('/:idTodo', [
    check('description', 'You should include a valid description').notEmpty(),
    check('endDate', 'You should include the endDate').notEmpty().isNumeric(),
    validateParams,
    validateJWT,
], updateTodo);

router.get('/:idTodo', [
    check('idTodo', 'You should include a valid id todo').notEmpty().isNumeric(),
    validateParams,
    validateJWT,
], getTodo);

router.get('/', [
    validateParams,
    validateJWT,
], getTodos);

router.delete('/:idTodo', [
    check('idTodo', 'You should include a valid id todo').notEmpty().isNumeric(),
    validateParams,
    validateJWT,
], completeTodo);

module.exports = router;
