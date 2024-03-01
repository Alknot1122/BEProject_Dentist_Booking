const express = require('express');

const {getDentists} = require('../controllers/dentists')


const routes = express.Router();

routes.route('/dentists').get(getDentists);

// Add routes
// routes.get('/', SessionController.store);
// routes.post('/', SessionController.store);
// routes.put('/', SessionController.store);
// routes.delete('/', SessionController.store);

module.exports = routes;
