const { Router } = require('express');
const { getWaterToday } = require('../controllers/water/getWaterToday');
const { validateParams } = require('../helpers/validateParams');
const { validateJWT } = require('../jwt/validateJWT');

const router = Router();

router.get('/', [
    validateParams,
    validateJWT,
], getWaterToday);

module.exports = router;
