const { Router } = require('express');
const { check } = require('express-validator');
const { createReminder } = require('../controllers/reminder/createReminder');
const { deleteReminder } = require('../controllers/reminder/deleteReminder');
const { getReminder } = require('../controllers/reminder/getReminder');
const { getReminders } = require('../controllers/reminder/getReminders');
const { updateReminder } = require('../controllers/reminder/updateReminder');
const { validateParams } = require('../helpers/validateParams');
const { validateJWT } = require('../jwt/validateJWT');

const router = Router();

router.get('/', [
    validateParams,
    validateJWT,
], getReminders);

router.post('/', [
    check('name', 'You should include a valid name').notEmpty(),
    check('hourBegin', 'You should include a hourBegin in the format HH:MM').notEmpty().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    check('hourEnd', 'You should include a hourEnd in the format HH:MM').notEmpty().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    check('repetitions', 'You should include the number of repetitions').notEmpty().isNumeric(),
    validateParams,
    validateJWT,
], createReminder);

router.get('/:idReminder', [
    check('idReminder', 'You should include a valid id reminder').notEmpty().isNumeric(),
    validateParams,
    validateJWT,
], getReminder);

router.put('/:idReminder', [
    check('idReminder', 'You should include a valid id reminder').notEmpty().isNumeric(),
    check('name', 'You should include a valid name').notEmpty(),
    check('hourBegin', 'You should include a hourBegin in the format HH:MM').notEmpty().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    check('hourEnd', 'You should include a hourEnd in the format HH:MM').notEmpty().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    check('repetitions', 'You should include the number of repetitions').notEmpty().isNumeric(),
    validateParams,
    validateJWT,
], updateReminder);

router.delete('/:idReminder', [
    check('idReminder', 'You should include a valid id reminder').notEmpty().isNumeric(),
    validateParams,
    validateJWT,
], deleteReminder);

module.exports = router;
