import React from 'react';
import Select from 'react-select'; //как работает API. Как выставлять значение по default. Передавать его в объекте или какой-то строкой. 
import makeAnimated from 'react-select/animated';
import './Filter.scss';
import shoesManufacturers from './dataShoesManufacturer';
import shoesModels from './dataShoesModels';
import shoesCategories from './dataShoesCategories';
import shoesColours from './dataShoesColours';
import shoesSizes from './dataShoesSizes';
import { withRouter } from "react-router";
import qs from 'qs';



const animatedComponents = makeAnimated();
const shoesManufacturerNumber = shoesManufacturers;

//come from URL: this.props.routes.params/ State убрать с фильтра
//сделать одним массивом цвета
class Filter extends React.Component {
  state = {
    shoesManufacturersFiltered: [],
    shoesCategoriesFiltered: [],
    shoesModelsToFilter: [],
    shoesModelsFiltered: [],
    shoesColourFiltered:[]
  }
  
  handleChosenProducers = (e) => {
    let shoesManufacturersFiltered=[];
    if(e !== null) {shoesManufacturersFiltered = e}
    console.log('handleChosenProducts e: ', e);
    this.setState({shoesManufacturersFiltered: shoesManufacturersFiltered});
    this.populateURL();
  } 

  handleChosenCategories = (e) => {
    let shoesCategoriesFiltered=[];
    console.log('handleChoseCategories e: ', e);
    if(e !== null) {shoesCategoriesFiltered = e} 
    this.setState({shoesCategoriesFiltered: shoesCategoriesFiltered});
    this.populateURL();
  } 

  handleChosenModels = (e) => {
    let shoesModelsFiltered = [];
    if(e !== null) {shoesModelsFiltered = e}
    // else {shoesModelsFiltered = e.map(element => element.label)};
    // // console.log('shoesModelsFiltered', shoesModelsFiltered);
    this.setState({shoesModelsFiltered: shoesModelsFiltered});
    this.populateURL();
  } 

  // handleChosenColour = (e) => {
  //   console.log('e.target.value of the colour: ', e.target.value);
  //   console.log('e.target: ', e.target);
  //   console.log('e.target.checked: ', e.target.checked);
  // }

  populateURL = () => {
    let finalURLManufacturers = '';
    let finalURLCategories = '';
    let finalURLModels = '';
    
    if (this.state.shoesManufacturersFiltered.length > 0) {this.state.shoesManufacturersFiltered.forEach(brand => finalURLManufacturers += `${brand.value}%`)}; //foreEach можно заменить на reduce. Пропадет необходимость использовать let. 
    if (this.state.shoesCategoriesFiltered.length > 0) {this.state.shoesCategoriesFiltered.forEach(category => finalURLCategories += `${category.value}%`)};
    if (this.state.shoesModelsFiltered.length > 0) {this.state.shoesModelsFiltered.forEach(model => finalURLModels += `${model.label}%`)};
    // this.state.shoesModelsFiltered.forEach(model => finalURLModels += `${model}%`)
    // console.log('finalURLManufacturers', finalURLManufacturers);                                      //del ete
    // console.log('finalURLCategories', finalURLCategories);                                            //delete
    
    this.props.history.push(`?producer=${finalURLManufacturers}`.slice(0, -1) //как поставить условие, если "=", чтобы не удалялся. Или удалять только %
    .concat(`&categories=${finalURLCategories}`.slice(0, -1))
    .concat(`&name=${finalURLModels}`.slice(0, -1)));
  }

  colourList() {
    // console.log('shoesColours', shoesColours);
    const colourVariances = shoesColours.map(colour => {
      return (
        <div className="by-colour__colour">
          <input 
            type="checkbox" 
            id={colour.id} 
            name={colour.colour} 
            value={colour.colour}
            onChange={this.handleChosenColour} 
            key={colour.id}
          />
          <label>{colour.colour}</label>
        </div>
      )
    })
    return colourVariances;
  }

  sizeList() {
    // console.log('shoesSizes', shoesSizes);
    const sizeVariances = shoesSizes.map(size => {
      return (
        <div className="by-size__size">
          <input 
            type="checkbox" 
            id={size.id} 
            name={size.size} 
            // onChange={this.handleChosenColour} 
            key={size.id}
          />
          <label>{size.size}</label>
        </div>
      )
    })
    return sizeVariances;
  }

  componentDidUpdate(prevProps, prevState){
    
    if(prevState.shoesManufacturersFiltered !== this.state.shoesManufacturersFiltered 
      || prevState.shoesCategoriesFiltered !== this.state.shoesCategoriesFiltered
      || prevState.shoesModelsFiltered !== this.state.shoesModelsFiltered) {
      this.populateURL();
      
      let shoesModelsPrevFiltered = [];
      let shoesModelsPostFiltered = [];
      let manufacturers = [];
      let categories =[];
      
      //If похожи. поэтому можно вынести в отедельную ф-цию.
      if(this.state.shoesManufacturersFiltered !== undefined 
        && this.state.shoesManufacturersFiltered.length !== null) 
        {manufacturers = this.state.shoesManufacturersFiltered.map(item => item.value)} 

      if(this.state.shoesCategoriesFiltered !== undefined 
        && this.state.shoesCategoriesFiltered.length !== null) 
        {categories = this.state.shoesCategoriesFiltered.map(item => item.value)} 

        console.log('manufacturers', manufacturers);
        console.log('categories', categories);

        shoesModelsPrevFiltered = shoesModels.filter(shoe => (
        (manufacturers.length == 0 || manufacturers.includes(shoe.company)) 
        && (categories.length == 0 || categories.includes(shoe.category))));
        console.log('shoesModelsPrevFiltered: ', shoesModelsPrevFiltered);

      shoesModelsPostFiltered = shoesModelsPrevFiltered.map(function(item) {return {'value': item.label, 'label': item.label}})  
      console.log('shoesModelsPostFiltered',  shoesModelsPostFiltered);  
      // Сюда вставить цвета

      this.setState({
        shoesModelsToFilter: shoesModelsPostFiltered
      });
      console.log('this.state.shoesModelsToFilter',  this.state.shoesModelsToFilter)
      console.log('this.state.shoesManufacturersFiltered',  this.state.shoesManufacturersFiltered)
    }
  }

  componentDidMount(prevProps, prevState){
    // let modelsToFilter = [];
    // if((this.state.shoesManufacturersFiltered === undefined || this.state.shoesManufacturersFiltered.length === 0) //Do I need to check this condition? 
    //   && ((this.state.shoesCategoriesFiltered === undefined || this.state.shoesCategoriesFiltered.length === 0)))   //Do I need to check this condition? Cause by default 
    //   {modelsToFilter = shoesModels};
      // console.log('modelsToFilter in componentDidMount: ', modelsToFilter);                                //delete
      
      console.log('componentDidMount: this.props.location.search', this.props.location.search);
      const URL = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
      const arrProducers = URL.producer === undefined ? [] : URL.producer.split('%');
      const arrCategories = URL.categories === undefined ? [] : URL.categories.split('%');
      const arrModels = URL.name === undefined ? [] : URL.name.split('%');
      
      let defaultValueProducers = [];
      if (arrProducers.length !== 0) {defaultValueProducers = arrProducers.map(function(item) {return {'value': item, 'label': item}})};
      //const defaultValueCategories = arrCategories.length !== 0 ? arrCategories.map(function(item) {return {'value': item, 'label': item}}) : 0;
      let defaultValueCategories = [];
      if(arrCategories.length !== 0) {defaultValueCategories = arrCategories.map(function(item) {return {'value': item, 'label': item}})};
      let defaultValueModels = [];
      if(arrModels.length !==0) {defaultValueModels = arrModels.map(function(item) {return {'value': item, 'label': item}})};
      this.setState({
        shoesManufacturersFiltered: defaultValueProducers,
        shoesCategoriesFiltered: defaultValueCategories,
        shoesModelsFiltered: defaultValueModels
      });
      
      console.log('componentDidMount - arrProducers: ', arrProducers);
      console.log('componentDidMount - defausltValueProducers', defaultValueProducers);
      console.log('componentDidMount - this.state.shoesManufacturersFiltered: ', this.state.shoesManufacturersFiltered)
      
  }

  render() {

    return (
      <div className="filter">
        
        <section className="filter__by-manufacturer">
          <div>Brand Name</div>
            <Select 
              placeholder='All Brands'
              closeMenuOnSelect={false} //убрать
              components={animatedComponents} //убрать
              value={this.state.shoesManufacturersFiltered} //сюда надо забить URL defaulutValueProducers
              isMulti
              onChange = {this.handleChosenProducers}
              options={shoesManufacturers} //убрать. будет своя собственная отрисовка. 
            />
        </section>
        <section className="filter__by-type">
          <div>Type of shoes</div>
            <Select 
              placeholder='All types'
              closeMenuOnSelect={false}
              components={animatedComponents}
              value={this.state.shoesCategoriesFiltered}
              isMulti
              options={shoesCategories}
              onChange={this.handleChosenCategories}
            />
        </section>
        <section className="filter__by-model">
          <div>Model of shoes</div>
            <Select 
              placeholder='All Models'
              closeMenuOnSelect={false}
              components={animatedComponents}
              value={this.state.shoesModelsFiltered} //defaulutValueModels 
              isMulti
              options={this.state.shoesModelsToFilter} //shoesModelsFiltered
              onChange={this.handleChosenModels}
            />
        </section>
        <h1 className="by-colour__header">Choose your colour</h1>
        {/* Свернуть до .map; подвязать с URL (чтобы выставлять состояния) , array.includes/contains - проверка состояния кнопки или check Shadow don*/}
        <section className='by-colour__filter'>    
          {this.colourList()} 
        </section>
        <h1 className="by-size__header">Choose your size</h1>
        <section className='by-size__filter'>    
          {this.sizeList()} 
        </section>
      
      </div>
    )
  }
}

export default withRouter(Filter); 


//Questions:
//1. How to keep filters after the page is reloaded