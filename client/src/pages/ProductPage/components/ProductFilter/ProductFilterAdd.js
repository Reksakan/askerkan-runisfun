import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { withRouter } from "react-router";
import {v4 as uuidv4} from 'uuid';

const getProductValue = (product) => {
  console.log('product in getProductValue: ', product)
  return (productField) => {
    console.log('productField in getProductValue', productField)
    if (product?.[productField] === undefined || product?.[productField] === null || isNaN(product?.[productField])) {
      return []
    }

    // create and array
    // map valued form this array

    return Array.isArray(product[productField]) ? product[productField] : [product[productField]]
  }
}

export const parseParams = (product) => {
  // console.log('product in parseParams function: ', product)
  const id = product.id;
  const getValue = getProductValue(product);

  const arrColour = getValue('colour');
  // console.log('arrColour: ', arrColour)
  let defaultValueColours = [];
  if (arrColour.length !== 0) {
    defaultValueColours = arrColour.map(function(item) {return {'value': item, 'label': item}})
  }

  const arrSize = getValue('size');
  // console.log('arrSize: ', arrSize)
  let defaultValueSizes = [];
  if (arrSize.length !== 0) {
    defaultValueSizes = arrSize.map(function(item) {return {'value': item, 'label': item}})
  }
  // arrColour and arrSize aren't used in the ProductFilter component. 
  return { id, product, arrColour, arrSize, defaultValueColours, defaultValueSizes }
}

//Explanation how to use the function in function. 
// const addValues = (number1) => {
//   return (number2) => {
//     return number1 + number2
//   }
// }

// const add2 = addValues(2)

// const someValue = add2(3) // === 5
