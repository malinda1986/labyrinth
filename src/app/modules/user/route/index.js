const express = require('express');
const userController = require('../controller');
const router = express.Router();

function userRoutes(handler, auth) {
    router.route('/all')
        .get(handler(userController.all))
    router.route('/:id')
        .get(handler(userController.get))
    router.route('')
        .post(handler(userController.create));

    return router;
}
module.exports = userRoutes;
