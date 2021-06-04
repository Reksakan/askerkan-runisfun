const express = require('express');
const router = express.Router();
const fs = require('fs');
const listOfShoesVariances = './Data/dataShoesVariances.json';

router.get('/', (request, response) => {
  const listOfShoes = JSON.parse(fs.readFileSync(listOfShoesVariances, 'utf8'));
  return response.status(200).json(listOfShoes);
}); 

router.get('/:currentShoeId', (request, response) => {
  const listOfShoes = JSON.parse(fs.readFileSync(listOfShoesVariances, 'utf8'));
  return response.status(200).json(listOfShoes.filter(currentShoe => {
    return currentShoe.id === request.params.currentShoeId;
  }));
})
module.exports = router; 

router.put('/', (request, response) => {
  const shoesBought = request.body;
  console.log('request for put request is: ', shoesBought);        //DELETE
  let shoeModels = shoesBought.map(shoe => {return shoe.id})
  let shoeTypes = shoesBought.map(shoe => {return shoe.idType})
  console.log('shoeModels: ', shoeModels);        //DELETE
  console.log('shoeVariances: ', shoeTypes);        //DELETE
  
  let newListOfShoes = JSON.parse(fs.readFileSync(listOfShoesVariances, 'utf8'));
  shoesBought.forEach(element => {
    let shoeToEdit = newListOfShoes.filter(shoe => {
      if (element.id.includes(shoe.id)) {
        let shoeTypesToEdit = shoe.types.filter(type => {
          if (element.idType.includes(type.idInt)) {
            if(type.quantity >= element.qtyToBuy) {
                type.quantity = type.quantity - element.qtyToBuy;
            } else {
                return response.send({msg: 'Check ordered quantity'})
            }
          }
        })
      }
    return shoe;
    })
  });
  try {
    fs.writeFileSync(listOfShoesVariances, JSON.stringify(newListOfShoes));
  } catch(error) {
    console.log(error)
  }
  let newShoesList = JSON.parse(fs.readFileSync(listOfShoesVariances, 'utf8'));
  // return response.status(200).json(newShoesList)
  return response.send({msg: 'Thank you for your order!'})
})