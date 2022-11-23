const { verifyConnection } = require('../../database/verifyConnection');
const { responseMsg } = require('../../helpers/responseMsg');
const { responseServerError } = require('../../helpers/responseServerError');
const Image = require('../../models/Image');

/* eslint-disable no-console */
const getImage = async (req, res) => {
    console.log('GET image');

    const { idImage } = req.params;

    const isConnected = await verifyConnection();
    if (!isConnected) {
        return responseServerError(res);
    }

    const image = await Image.findOne({
        where: {
            id: idImage,
        },
    });

    if (!image) return responseMsg(res, 404, true, 'Image not found', {});

    return responseMsg(res, 200, true, '', {
        url: image.url,
        name: image.name,
    });
};

module.exports = {
    getImage,
};
