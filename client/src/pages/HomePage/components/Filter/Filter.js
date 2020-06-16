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
    shoesModelsFiltered: []
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
      shoesModelsFiltered: shoesModelsFiltered
    })
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
        <section>
          <div>
            <input type="checkbox" id="black" name="Black" checked />
            <label for="black">Black</label>
          </div>
          <div>
            <input type="checkbox" id="white" name="White" checked />
            <label for="white">White</label>
          </div>
          <div>
            <input type="checkbox" id="red" name="red" checked />
            <label for="red">Red</label>
          </div>
        </section>
      </div>
    )
  }
}

export default Filter; 