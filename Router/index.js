const express = require('express');

const route = express.Router();

const restaurantController = require('../Controller/Restaurants');


route.post('/filter', restaurantController.restaurantsFilter);



module.exports = route;