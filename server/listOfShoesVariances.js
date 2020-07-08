const express = require('express');
const router = express.Router();
const listOfShoesVariances = require('./Data/dataShoesVariances.json');

router.get('/', (request, response) => {
  return response.status(200).json(listOfShoesVariances);
}); 

// router.get('/:currentShoeId', (request, response) => {
//   return response.status(200).json(listOfShoesVariances.filter(currentShoe => {
//     return currentShoe.id === request.params.currentShoeId;
//   }));
// })
module.exports = router; 