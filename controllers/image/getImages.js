const { verifyConnection } = require('../../database/verifyConnection');
const { responseMsg } = require('../../helpers/responseMsg');
const { responseServerError } = require('../../helpers/responseServerError');
const Image = require('../../models/Image');

/* eslint-disable no-console */
const getImages = async (req, res) => {
    console.log('GET images');

    const isConnected = await verifyConnection();
    if (!isConnected) {
        return responseServerError(res);
    }

    const images = await Image.findAll();

    const data = images.map((img) => img.dataValues);

    return responseMsg(res, 200, true, '', {
        images: data,
        length: data.length,
    });
};

module.exports = {
    getImages,
};
