const express = require('express');
const router = express.Router();
const fs = require('fs');
const listOfShoesVariances = require('./Data/dataShoesVariances.json');
const listOfShoesVariancesNew = './Data/dataShoesVariancesNew.json';

router.get('/', (request, response) => {
  return response.status(200).json(listOfShoesVariances);
}); 

router.get('/:currentShoeId', (request, response) => {
  return response.status(200).json(listOfShoesVariances.filter(currentShoe => {
    return currentShoe.id === request.params.currentShoeId;
  }));
})
module.exports = router; 

router.put('/', (request, response) => {
  console.log('request for put request is: ', request.body);        //DELETE
  
  let shoeModels = request.body.map(shoe => {return shoe.idShoe})
  let shoeVariances = request.body.map(shoe => {return shoe.idInt})
  console.log('shoeModels: ', shoeModels);        //DELETE
  console.log('shoeVariances: ', shoeVariances);        //DELETE
  let newListOfShoes = listOfShoesVariances;
  request.body.forEach(element => {
    let shoeToEdit = newListOfShoes.filter(shoe => {
      if (element.idShoe.includes(shoe.id)) {
        let shoeVarianceToEdit = shoe.types.filter(type => {
          if (element.idInt.includes(type.idInt)) {
            type.quantity = type.quantity - 1
          }
        })
      }
    return shoe;
    })
  });
  try {
    fs.writeFileSync(listOfShoesVariancesNew, JSON.stringify(newListOfShoes));

  } catch(error) {
    console.log(error)
  }
  let newShoesList = JSON.parse(fs.readFileSync(listOfShoesVariancesNew, 'utf8'));
  return response.status(200).json(newShoesList)
})