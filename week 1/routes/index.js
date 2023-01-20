const routes = require('express').Router();


const myController = require('../controllers/index');

routes.get('/', myController);


module.exports = routes;