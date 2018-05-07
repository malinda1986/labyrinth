const express = require('express');
const LabyrintController = require('../controller');
const router = express.Router();

function userRoutes(handler, auth) {
    router.route('/:id')
        .get(handler(LabyrintController.get))
    router.route('/:id/playfield/:x/:y/:type')
        .patch(handler(LabyrintController.setType));
    router.route('/:id/:status/:x/:y')
        .patch(handler(LabyrintController.setStartEnd));
    router.route('/')
        .get(handler(LabyrintController.getAll));
    router.route('/')
        .post(handler(LabyrintController.create));
    router.route('/:id/solution')
        .post(handler(LabyrintController.solution));
  

    return router;
}
module.exports = userRoutes;
