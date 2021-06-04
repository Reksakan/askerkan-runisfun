const express = require('express');
const router = express.Router();
const fs = require('fs');
const complianceFile = './Data/dataComplianceList.json';
const dataOfCompliance = require(complianceFile);

router.get('/', (request, response) => {
  return response.status(200).json(dataOfCompliance);
}); 

router.post('/compliance', (request, response) => {
  const newCompliance = request.body;                                               //delete
  console.log('request.body', request.body);
  if (
      newCompliance.id
    && newCompliance.fullName 
    && newCompliance.date
    && newCompliance.phone
    && newCompliance.name
    && newCompliance.description
  ) {
    const newDataOfCompliance = [...dataOfCompliance, newCompliance];
    console.log('newDataOfCompliance', newDataOfCompliance)                         //delete
    fs.writeFile(complianceFile, JSON.stringify(newDataOfCompliance), () => {
      return response.status(201).json(newDataOfCompliance);
    })   
  } else {
    response.status(400).json({
      success: false
    })}; 
});

module.exports = router; 