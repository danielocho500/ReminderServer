const { Router } = require('express');
const { check } = require('express-validator');
const { confirmAccount } = require('../controllers/mail/confirmAccount');
const { resetPassword } = require('../controllers/mail/resetPassword');
const { mailConfirmation } = require('../controllers/mail/sendConfirmation');
const { sendPasswordReset } = require('../controllers/mail/sendPasswordReset');
const { validateParams } = require('../helpers/validateParams');
const { validateJWT } = require('../jwt/validateJWT');

const router = Router();

router.post('/sendConfirmation', [
    validateParams,
    validateJWT,
], mailConfirmation);

router.post('/confirmMail/:pin', [
    check('pin', 'you should include a valid pin').notEmpty(),
    validateParams,
], confirmAccount);

router.post('/sendPasswordConfirmation', [
    check('email', 'You should include a valid email').notEmpty().isEmail(),
    validateParams,
], sendPasswordReset);

router.post('/changePassword/:pin', [
    check('pin', 'you should include a valid pin').notEmpty(),
    check('password', 'You should include a password').notEmpty(),
    check('password', 'The password is not secure').isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
    }),
    validateParams,
], resetPassword);

module.exports = router;
