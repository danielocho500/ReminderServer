const { Router } = require('express');
const { check } = require('express-validator');
const { authLogin } = require('../controllers/authLogin');
const { authRegister } = require('../controllers/authRegister');
const { registerData } = require('../controllers/registerData');
const { validateParams } = require('../helpers/validateParams');
const { validateJWT } = require('../jwt/validateJWT');

const router = Router();
router.post('/login', [
    check('email', 'You should include a valid email').isEmail().notEmpty(),
    check('password', 'You should include a password').notEmpty(),
    validateParams,
], authLogin);

router.post('/register', [
    check('email', 'You should include a valid email').isEmail().notEmpty(),
    check('username', 'You should include a username').notEmpty(),
    check('password', 'You should include a password').notEmpty(),
    check('password', 'The password is not secure').isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
    }),
    validateParams,
], authRegister);

router.post('/registerdata', [
    check('weight', 'You should include a valid weight').notEmpty().isNumeric(),
    check('height', 'You should include a valid weight').notEmpty().isNumeric(),
    check('genre', 'You should include a valid genre').notEmpty(),
    check('activity', 'You should include a valid activy frecuency').notEmpty().isNumeric(),
    validateParams,
    validateJWT,
], registerData);

module.exports = router;
