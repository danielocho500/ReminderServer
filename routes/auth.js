const { Router } = require('express');
const { check } = require('express-validator');
const { authLogin } = require('../controllers/auth');
const { validateParams } = require('../helpers/validateParams');

const router = Router();
router.post('/', [
    check('email', 'You should include a valid email').isEmail().notEmpty(),
    check('password', 'You should include a password').notEmpty(),
    validateParams,
], authLogin);

module.exports = router;
