const { Router } = require('express');
const { check } = require('express-validator');
const { pushStat } = require('../controllers/stat/pushStat');
const { validateParams } = require('../helpers/validateParams');
const { validateJWT } = require('../jwt/validateJWT');

const router = Router();

router.post('/:idReminder', [
    check('idReminder', 'id del reminder').notEmpty().isNumeric(),
    validateParams,
    validateJWT,
], pushStat);

module.exports = router;
