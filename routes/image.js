const { Router } = require('express');
const { check } = require('express-validator');
const { getImage } = require('../controllers/image/getImage');
const { getImages } = require('../controllers/image/getImages');
const { validateParams } = require('../helpers/validateParams');

const router = Router();

router.get('/', [
    validateParams,
], getImages);

router.get('/:idImage', [
    check('idImage', 'You should include a valid idImage').notEmpty().isNumeric(),
    validateParams,
], getImage);

module.exports = router;
