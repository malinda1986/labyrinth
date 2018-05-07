const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../../APIdoc/swagger.json');
const userHandler = require('./user');
const labyrintHanler = require('./labyrint');
const api = require('../api');
const config = require('../config');
const {app_path} = config.get('api');
const {signIn} = require('./login/route');

const apiRoutes = function(middleware) {
    try {
        const router = express.Router();
        const {api: {cors, errorHandler}, auth} = middleware;
        // enable CORS
        router.use(cors());

        router.use('/apidoc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        router.use(`${app_path}/user`, auth, userHandler.routes(api.http));
        router.use(`${app_path}/labyrinth`, auth, labyrintHanler.routes(api.http));
        router.use(`${app_path}/signin`, signIn(api.http));
        return router;
    } catch (e) {
        console.log(e);
    }
};

module.exports = apiRoutes;
