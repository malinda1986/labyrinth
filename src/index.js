const mongoose = require('mongoose');
// make sure env is set properly
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
mongoose.set('debug', true);

const appService = require('./app');
const Server = require('./app/server');
const app = appService();

Server.start(app).catch(error => {
    // TODO: logging
    console.log(error);
    /*eslint-disable */
    process.exit(0);
});
