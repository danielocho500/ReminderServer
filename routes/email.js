const { Router } = require('express');
const { mailConfirmation } = require('../controllers/mail/sendConfirmation');
const { validateParams } = require('../helpers/validateParams');
const { validateJWT } = require('../jwt/validateJWT');

const router = Router();

router.post('/sendConfirmation', [
    validateParams,
    validateJWT,
], mailConfirmation);

module.exports = router;
