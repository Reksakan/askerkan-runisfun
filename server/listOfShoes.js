const express = require('express');
const router = express.Router();
const listOfShoes = require('./Data/dataShoesList.json');

router.get('/', (request, response) => {
  return response.status(200).json(listOfShoes);
}); 

module.exports = router; 