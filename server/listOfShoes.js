const express = require('express');
const router = express.Router();
const listOfShoesVariances = require('./Data/dataShoesVariances.json');

router.get('/', (request, response) => {
  return response.status(200).json(listOfShoesVariances);
}); 

module.exports = router; 