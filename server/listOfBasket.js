const express = require('express');
const router = express.Router();
const fs = require('fs');
const basketDataFile = './Data/dataBasket.json';

router.get('/', (request, response) => {
  const dataOfBasket = JSON.parse(fs.readFileSync(basketDataFile, 'utf8'));
  return response.status(200).json(dataOfBasket);
}); 

router.post('/', (request, response) => {
  let newBasket = request.body;
  let oldBasket = [];
  if (newBasket) {
    oldBasket = JSON.parse(fs.readFileSync(basketDataFile, 'utf8'));
    let newDataOfBasket = [...oldBasket, newBasket];
    fs.writeFileSync(basketDataFile, JSON.stringify(newDataOfBasket))
  }
})

router.delete('/:idUnique', (request, response) => {
  basket = JSON.parse(fs.readFileSync(basketDataFile, 'utf8'));
  // let newBasket = [];
  if(basket.find(item => { return item.idUnique === request.params.idUnique})) {
    let index = basket.findIndex(index => {return index.idUnique === request.params.idUnique})
    basket.splice(index, 1);
    fs.writeFileSync(basketDataFile, JSON.stringify(basket));
    response.status(200).send(JSON.parse(fs.readFileSync(basketDataFile, 'utf8')))
    console.log('response from server: ', JSON.parse(fs.readFileSync(basketDataFile, 'utf8')))
  }
})

module.exports = router; 