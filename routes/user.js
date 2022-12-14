const { Router } = require('express');
const { check } = require('express-validator');
const { getUserData } = require('../controllers/user/getUserData');
const { getUserInfo } = require('../controllers/user/getUserInfo');
const { updateUserInfo } = require('../controllers/user/updateUserInfo');
const { validateParams } = require('../helpers/validateParams');
const { validateJWT } = require('../jwt/validateJWT');

const router = Router();

router.get('/', [
    validateParams,
    validateJWT,
], getUserInfo);

router.get('/data', [
    validateParams,
    validateJWT,
], getUserData);

router.patch('/', [
    check('weight', 'You should include a valid weight').notEmpty().isNumeric(),
    check('height', 'You should include a valid weight').notEmpty().isNumeric(),
    check('genre', 'You should include a valid genre').notEmpty(),
    check('activity', 'You should include a valid activy frecuency').notEmpty().isNumeric(),
    validateParams,
    validateJWT,
], updateUserInfo);

module.exports = router;
