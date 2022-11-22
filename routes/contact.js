const { Router } = require('express');
const { check } = require('express-validator');
const { createContact } = require('../controllers/contact/createContact');
const { validateParams } = require('../helpers/validateParams');

const router = Router();

router.post('/', [
    check('email', 'You should include a valid email').notEmpty().isEmail(),
    check('firstName', 'You should include the firstName').notEmpty(),
    check('lastName', 'You should include the lastName').notEmpty(),
    check('message', 'You should include the message').notEmpty(),
    validateParams,
], createContact);

module.exports = router;
