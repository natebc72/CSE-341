const routes = require('express').Router();


const myController = require('../controllers/index');

routes.get('/', myController);
routes.get('/another', myController);


module.exports = routes;