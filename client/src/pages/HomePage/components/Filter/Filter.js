import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import './Filter.scss';
import shoesManufacturer from './datashoesManufacturer';
import shoesModels from './datashoesModels';

const animatedComponents = makeAnimated();


class Filter extends React.Component {
  state = {
    shoesModelsFiltered: []
  }

  handleChosenProducers = (selectedProducers) => {
    console.log('Outcome from the first Select: ', selectedProducers);
    console.log(selectedProducers.length) //If delete all brands error pops-up cause the property's value is null (not '0')
    console.log('shoesModels', shoesModels);
    console.log('selectedProducers[0].label:  ', selectedProducers[0].label);
    
    let shoesModelsFiltered = [];

    for (let i=0; i < selectedProducers.length; i++) {
      shoesModelsFiltered = shoesModelsFiltered.concat(shoesModels.filter(models => models.company === selectedProducers[i].label.toLowerCase())) 
    }
    
    console.log('shoesModelsFiltered', shoesModelsFiltered);
    
    this.setState({
      shoesModelsFiltered: shoesModelsFiltered
    })
  }

/*   handleChosenModels = (selectedModels) => {
    console.log('Outcome from the first Select: ', selectedModels);
    this.setState({
      models: selectedModels
    })
  } */

  render() {
    return (
      <div className="filter">
        <section className="filter__by-manufacturer">
          <Select 
            closeMenuOnSelect={false}
            components={animatedComponents}
            defaultValue={shoesManufacturer[0]}
            isMulti
            onChange = {this.handleChosenProducers}
            options={shoesManufacturer}
            
          />
        </section>
        <section className="filter__by-model">
          <Select 
            closeMenuOnSelect={false}
            components={animatedComponents}
            defaultValue={shoesModels[0], shoesModels[1]}
            isMulti
            options={this.state.shoesModelsFiltered}
            onChange={this.handleChosenModels}
          />
        </section>
      </div>
    )
  }
}

export default Filter; 