const { Router } = require('express');
const { getRemindersHours } = require('../controllers/reminderHours/getReminderHours');
const { validateParams } = require('../helpers/validateParams');
const { validateJWT } = require('../jwt/validateJWT');

const router = Router();

router.get('/', [
    validateParams,
    validateJWT,
], getRemindersHours);

module.exports = router;
