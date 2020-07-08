const express = require('express');
const router = express.Router();
const fs = require('fs');
const basketDataFile = './Data/dataBasket.json';
const dataOfBasket = require(basketDataFile);



router.get('/', (request, response) => {
  return response.status(200).json(dataOfBasket);
}); 


router.post('/', (request, response) => {
  
  const newBasket = request.body; 
  console.log('newBasket which will be added:', newBasket);
  //Here can put 'if' statement if any check is needed
  if (newBasket  
  /*    && newBasket.name
    && newBasket.producer
    && newBasket.price
    && newBasket.link
    && newBasket.types.idInt */) {
      const newDataOfBasket = [...dataOfBasket, newBasket];
      fs.writeFile(basketDataFile, JSON.stringify(newDataOfBasket), () => {
        return response.status(201).json(newDataOfBasket);
      })}
    else {
      response.status(400).json({
        success: false
      })
    };
})


module.exports = router; 