/* eslint-disable no-console */
const { verifyConnection } = require('../../database/verifyConnection');
const { responseMsg } = require('../../helpers/responseMsg');
const { responseServerError } = require('../../helpers/responseServerError');
const Contact = require('../../models/Contact');

const createContact = async (req, res) => {
    console.log('POST contact');

    const {
        email,
        firstName,
        lastName,
        message,
    } = req.body;

    const isConnected = await verifyConnection();
    if (!isConnected) {
        return responseServerError(res);
    }

    try {
        await Contact.create({
            email,
            firstName,
            lastName,
            message,
        });

        return responseMsg(res, 200, true, {
            created: true,
        });
    } catch (err) {
        console.log(err);
        return responseServerError(res);
    }
};

module.exports = {
    createContact,
};
