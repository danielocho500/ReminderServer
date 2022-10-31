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
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`servidor corriendo en puerto: ${this.port}`);
        });
    }
}

module.exports = Server;
