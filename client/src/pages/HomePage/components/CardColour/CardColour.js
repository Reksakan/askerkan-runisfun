import React from 'react';
import './CardColour.scss';


const CardColour = ({shoeVariances}) => {
    
    const colours = shoeVariances
      .map(shoeTypes => shoeTypes.colour)
      .reduce((unique, colour) => unique.includes(colour) ? unique : [...unique, colour],[]);
    
    const coloursAvailable = colours.map(colour => {
      return (<div className={colour}></div>)
    });
  return (<div className="colours__list">{coloursAvailable}</div>)
}

export default CardColour;

// const CardColour = ({shoeVariances}) => {
//   const colours = shoeVariances.map(shoeTypes => shoeTypes.colour);
//   console.log('colours: ', colours); 
//   const coloursAvailable = colours.reduce((unique, colour) => unique.includes(colour) ? unique : [...unique, colour],[]);
//   console.log('coloursAvailable', coloursAvailable);
// return (<div>{coloursAvailable}</div>)
// }

// export default CardColour;