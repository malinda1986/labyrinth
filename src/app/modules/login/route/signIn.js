const express = require('express');
const {signIn} = require('../controller');
const router = express.Router();

function setupRoutes(handler) {
    router.post('/local', handler(signIn.localSignIn));

    return router;
}

module.exports = setupRoutes;
