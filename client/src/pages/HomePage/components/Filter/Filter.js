import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import './Filter.scss';
import shoesManufacturer from './datashoesManufacturer';
import shoesModels from './datashoesModels';

const animatedComponents = makeAnimated();
const shoesManufacturerNumber = shoesManufacturer;


class Filter extends React.Component {
  state = {
    shoesManufacturerFiltered: [],
    shoesModelsFiltered: [],
    colourBlack: false,
    colourWhite: false,
    colourBlue: false,
    colourRed: false
  }

  handleChosenProducers = (selectedArray) => {    
    let len = 0;
    let selectedProducers = [];
    let shoesModelsFiltered = [];
    
    if (selectedArray === null) {
      len = shoesManufacturer.length;
      selectedProducers = shoesManufacturer;
    } else {
        len = selectedArray.length;
        selectedProducers = selectedArray;
      };
    
    for (let i=0; i < len; i++) {
      shoesModelsFiltered = shoesModelsFiltered.concat(shoesModels.filter(models => models.company === selectedProducers[i].label.toLowerCase())) 
    }
    
    this.setState({
      shoesManufacturerFiltered: selectedProducers,
      shoesModelsFiltered: shoesModelsFiltered
    })
  }

  handleChosenColour = e => {
    const target = e.target;
    console.log(`Colour ${target.name} is chosen`, target.checked);     //delete
    const name = target.name;
    this.setState({
      [name]: target.checked
    })
  }

  handleStateStatus = e => {
    console.log('Status of the Black colour in the State: ', this.state.colourBlack);
    console.log('Status of the White colour in the State: ', this.state.colourWhite);
    console.log('Status of the Red colour in the State: ', this.state.colourRed);
    console.log('Status of the Blue colour in the State: ', this.state.colourBlue);
    console.log('Status of shoesManufacturerFiltered', this.state.shoesManufacturerFiltered);
    console.log('Status of shoesModelsFiltered', this.state.shoesModelsFiltered);
  }

  render() {
    return (
      <div className="filter">
        
        <section className="filter__by-manufacturer">
          <Select 
            placeholder='Select Brand'
            closeMenuOnSelect={false}
            components={animatedComponents}
            defaultValue={0}
            isMulti
            onChange = {this.handleChosenProducers}
            options={shoesManufacturer}
            
          />
        </section>
        <section className="filter__by-model">
          <Select 
            placeholder='Select Models'
            closeMenuOnSelect={false}
            components={animatedComponents}
            defaultValue={0}
            isMulti
            options={this.state.shoesModelsFiltered}
            onChange={this.handleChosenModels}
          />
        </section>
        <section className='filter__by-colour'>
          <legeds>Choose your colour</legeds>  
            <div>
              <input type="checkbox" id="black" name="colourBlack" value={this.state.colourBlack} onChange={this.handleChosenColour} />
              <label for="black">Black</label>
            </div>
            <div>
              <input type="checkbox" id="white" name="colourWhite" value={this.state.colourWhite} onChange={this.handleChosenColour} />
              <label for="white">White</label>
            </div>
            <div>
              <input type="checkbox" id="red" name="colourRed" value={this.state.colourRed} onChange={this.handleChosenColour} />
              <label for="red">Red</label>
            </div>
            <div>
              <input type="checkbox" id="blue" name="colourBlue"  value={this.state.colourBlue} onChange={this.handleChosenColour} />
              <label for="blue">Blue</label>
            </div>
        </section>
        <section className="delete-after">
          
          <button className="check-button" type="button" onClick={this.handleStateStatus}>State status</button>
        </section>
      
      </div>
    )
  }
}

export default Filter; 