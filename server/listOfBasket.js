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
    console.log('newDataOfBasket: ', newDataOfBasket);
    fs.writeFileSync(basketDataFile, JSON.stringify(newDataOfBasket))
  }
})

// router.post('/', (request, response) => {
//   let newBasket = request.body; 
//   let oldBasket = [];
//   //Here can put 'if' statement if any check is needed
//     if (newBasket) {
//       fs.readFile(basketDataFile, 'utf8', (err, jsonString) => {
//         if(err) {
//           console.log('Error reading file from: ', err)
//           return
//         }
//         try {
//           oldBasket = JSON.parse(jsonString)
//           const newDataOfBasket = [...oldBasket, newBasket];
//           fs.writeFile(basketDataFile, JSON.stringify(newDataOfBasket), () => {
//           return response.status(201).json(newDataOfBasket);
//       })
//         } catch(err) {
//           console.log('Error parsing JSON string: ', err)
//         }
//       })
//     } else {
//       response.status(400).json({
//         success: false
//       })
//     };
// })


module.exports = router; 