const { Router } = require('express');
const { getUserInfo } = require('../controllers/getUserInfo');
const { validateParams } = require('../helpers/validateParams');
const { validateJWT } = require('../jwt/validateJWT');

const router = Router();

router.get('/', [
    validateParams,
    validateJWT,
], getUserInfo);

module.exports = router;
