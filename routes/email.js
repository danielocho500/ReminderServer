const { Router } = require('express');
const { check } = require('express-validator');
const { confirmAccount } = require('../controllers/mail/confirmAccount');
const { mailConfirmation } = require('../controllers/mail/sendConfirmation');
const { validateParams } = require('../helpers/validateParams');
const { validateJWT } = require('../jwt/validateJWT');

const router = Router();

router.post('/sendConfirmation', [
    validateParams,
    validateJWT,
], mailConfirmation);

router.post('/confirmMail/:pin', [
    check('pin', 'you shoul include a valid pin').notEmpty(),
    validateParams,
], confirmAccount);

module.exports = router;
