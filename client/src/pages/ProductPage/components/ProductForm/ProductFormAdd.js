const getProductValue = (product) => {
  return (productField) => {
    if (product?.[productField] === undefined || product?.[productField] === null) {
      return []
    }
    // create and array
    // map valued form this array
    return Array.isArray(product[productField]) ? product[productField] : [product[productField]]
  }
}

export const parseParams = (product) => {
  const id = product.id;
  const getValue = getProductValue(product);

  const arrColour = getValue('colour');
  let defaultValueColours = [];
  if (arrColour.length !== 0) {
    defaultValueColours = arrColour.map(function(item) {return {'value': item, 'label': item}})
  }

  const arrSize = getValue('size');
  let defaultValueSizes = [];
  if (arrSize.length !== 0) {
    defaultValueSizes = arrSize.map(function(item) {return {'value': item, 'label': item}})
  }
  // arrColour and arrSize aren't used in the ProductFilter component. 
  return { id, product, arrColour, arrSize, defaultValueColours, defaultValueSizes }
}

export const selectComponentInput = (data, dataSelected) => {
  const dataSelectedAll = data.map(function(item) {return item[dataSelected]});
  const dataSelectedAllFiltered = dataSelectedAll.reduce((fitures, fiture) => (fitures.includes(fiture) ? fitures : [...fitures, fiture]), []).sort();
  const dataSelectedOutput = dataSelectedAllFiltered.map(function(item) {return {'value': item, 'label': item}})
  return { dataSelectedOutput }
}

//Explanation how to use the function in function. 
// const addValues = (number1) => {
//   return (number2) => {
//     return number1 + number2
//   }
// }

// const add2 = addValues(2)

// const someValue = add2(3) // === 5
