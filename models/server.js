/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
require('dotenv').config();
const path = require('path');

const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.home = '';

        this.authPath = '/api/auth';
        this.userPath = '/api/user';
        this.waterPath = '/api/water';
        this.remindersPath = '/api/reminder';
        this.hourPath = '/api/hours';
        this.emailPath = '/api/email';
        this.contactPath = '/api/contact';
        this.imagePath = '/api/images';
        this.todoPath = '/api/todo';
        this.statPath = '/api/stat';

        this.middlewares();

        this.routes();
        this.listen();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.userPath, require('../routes/user'));
        this.app.use(this.waterPath, require('../routes/water'));
        this.app.use(this.remindersPath, require('../routes/reminder'));
        this.app.use(this.hourPath, require('../routes/reminderHours'));
        this.app.use(this.emailPath, require('../routes/email'));
        this.app.use(this.contactPath, require('../routes/contact'));
        this.app.use(this.imagePath, require('../routes/image'));
        this.app.use(this.todoPath, require('../routes/todo'));
        this.app.use(this.statPath, require('../routes/stat'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`servidor corriendo en puerto: ${this.port}`);
        });
    }
}

module.exports = Server;
