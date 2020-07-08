import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import qs from 'qs';
import './Filter.scss';
import shoesManufacturers from './dataShoesManufacturer';
import shoesModels from './dataShoesModels';
import shoesCategories from './dataShoesCategories';
import shoesColours from './dataShoesColours';
import shoesSizes from './dataShoesSizes';
import { withRouter } from "react-router";




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
    shoesColoursFiltered: [
      {id: '1', colour: 'white', isChecked: 'false'},
      {id: '2', colour: 'black', isChecked: 'false'},
      {id: '3', colour: 'red', isChecked: 'false'},
      {id: '4', colour: 'blue', isChecked: 'false'}
    ],
    shoesSizesFiltered: []
  }
  
  clearAllFilters = (e) => {
    this.setState({
      shoesManufacturersFiltered: [],
      shoesCategoriesFiltered: [],
      shoesModelsFiltered: []
    })
  }  
  //Doesn't work properly
   handleByTyping = (e) => {
     const searchParameter = e.target.value.trim();
     let filtered = []
     const filteredShoe = shoesModels.filter(shoe => {
       if (shoe.label.toLowerCase().includes(searchParameter)) {return shoe}})
        .map(shoe => shoe.label)
        .map(function(item) {return {'value': item, 'label':item}});
     
     if (filteredShoe.length < shoesModels.length - 2) {
      this.setState({ 
        shoesModelsFiltered: filteredShoe
      })
     }  
   } 
  
  handleChosenProducers = (e) => {
    let shoesManufacturersFiltered=[];
    if(e !== null) {shoesManufacturersFiltered = e}
    // console.log('handleChosenProducts e: ', e);
    this.setState({shoesManufacturersFiltered: shoesManufacturersFiltered});
    this.populateURL();
  } 

  handleChosenCategories = (e) => {
    let shoesCategoriesFiltered=[];
    // console.log('handleChoseCategories e: ', e);
    if(e !== null) {shoesCategoriesFiltered = e} 
    this.setState({shoesCategoriesFiltered: shoesCategoriesFiltered});
    this.populateURL();
  } 

  handleChosenModels = (e) => {
    let shoesModelsFiltered = [];
    if(e !== null) {shoesModelsFiltered = e}
    // else {shoesModelsFiltered = e.map(element => element.label)};
    //console.log('shoesModelsFiltered: ', shoesModelsFiltered);
    this.setState({shoesModelsFiltered: shoesModelsFiltered});
    this.populateURL();
  } 

  handleChosenColour = (e) => {
    let shoesColoursFiltered = this.state.shoesColoursFiltered;
    shoesColoursFiltered.forEach(colour => {if (colour.colour === e.target.value) colour.isChecked = e.target.checked});
    this.setState({shoesColoursFiltered: shoesColoursFiltered});
    //console.log(this.state.shoesColoursFiltered);
    this.populateURL();
  }

  populateURL = () => {
    const finalURLManufacturers = this.state.shoesManufacturersFiltered.map(brand => brand.value);
    const finalURLCategories = this.state.shoesCategoriesFiltered.map(category => category.value);
    const finalURLModels = this.state.shoesModelsFiltered.map(model => model.value);
    const finalURLColours = this.state.shoesColoursFiltered.filter(colour => colour.isChecked === true).map(colour => colour.colour);
    //console.log('finalURLModels to Populate to URL', finalURLModels);
    //console.log('shoesModelsFiltered to Populate to URL', this.state.shoesModelsFiltered)

    const URLParams = {}; 
    if(finalURLManufacturers.length > 0) {URLParams.producer = finalURLManufacturers}
    if(finalURLCategories.length > 0) {URLParams.categories = finalURLCategories}
    if(finalURLModels.length > 0) {URLParams.name = finalURLModels}
    if(finalURLColours.length > 0) {URLParams.colour = finalURLColours}
    
    // console.log('finalURLManufacturers', finalURLManufacturers);                                      //delete
    // console.log('finalURLCategories', finalURLCategories);                                            //delete
    
    const str = qs.stringify(URLParams, { addQueryPrefix: true, arrayFormat: 'comma', encode: false });
    //console.log('str:  ---',str);
    this.props.history.push(str);
  }
//Filter by size will be realized in Stage II
  colourList() {
    const shoesByColours = this.state.shoesColoursFiltered
    // console.log('shoesColours in colourList(): ', shoesByColours);
    const colourVariances = shoesByColours.map(colour => {
      return (
        <div className="by-colour__colour">
          <input 
            type="checkbox" 
            id={colour.id} 
            name={colour.colour} 
            value={colour.colour}
            isChecked = {colour.isChecked}
            onChange={this.handleChosenColour} 
            key={colour.id}
          />
          <label>{colour.colour}</label>
        </div>
      )
    })
    return colourVariances;
  }

  //Filter by size will be realized in Stage II
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
      //this.handleByTyping();
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

        // console.log('manufacturers', manufacturers);
        // console.log('categories', categories);

        shoesModelsPrevFiltered = shoesModels.filter(shoe => (
        (manufacturers.length == 0 || manufacturers.includes(shoe.company)) 
        && (categories.length == 0 || categories.includes(shoe.category))));
        // console.log('shoesModelsPrevFiltered: ', shoesModelsPrevFiltered);

      shoesModelsPostFiltered = shoesModelsPrevFiltered.map(function(item) {return {'value': item.label, 'label': item.label}})  
      // console.log('shoesModelsPostFiltered',  shoesModelsPostFiltered);  
      // Сюда вставить цвета

      this.setState({
        shoesModelsToFilter: shoesModelsPostFiltered
      });
      // console.log('this.state.shoesModelsToFilter',  this.state.shoesModelsToFilter)
      // console.log('this.state.shoesManufacturersFiltered',  this.state.shoesManufacturersFiltered)
    }
  }

  componentDidMount(){
    // let modelsToFilter = [];
    // if((this.state.shoesManufacturersFiltered === undefined || this.state.shoesManufacturersFiltered.length === 0) //Do I need to check this condition? 
    //   && ((this.state.shoesCategoriesFiltered === undefined || this.state.shoesCategoriesFiltered.length === 0)))   //Do I need to check this condition? Cause by default 
    //   {modelsToFilter = shoesModels};
      // console.log('modelsToFilter in componentDidMount: ', modelsToFilter);                                //delete
      
      // console.log('componentDidMount: this.props.location.search', this.props.location.search);
      const URL = qs.parse(this.props.location.search, { comma: true, ignoreQueryPrefix: true });
      console.log('URL after refresh: ', URL)
      const arrProducers = URL.producer === undefined ? [] : Array.isArray(URL.producer) ? URL.producer : [URL.producer];
      const arrCategories = URL.categories === undefined ? [] : Array.isArray(URL.categories) ? URL.categories : [URL.categories]; 
      const arrModels = URL.name === undefined ? [] : Array.isArray(URL.name) ? URL.name : [URL.name];
      // console.log('URL.colour: ', URL.colour);                                                      //DELETE!!!!!
      const arrColours = URL.colour === undefined ? [] : Array.isArray(URL.colour) ? URL.colour : [URL.colour];
      //const arrSizes = URL.size === undefined ? [] : Array.isArray(URL.size) ? URL.size : [URL.size];
      //console.log('arrColours: ', arrColours);                                                    //DELETE!!!!!
      
      let defaultValueProducers = [];
      if (arrProducers.length !== 0) {defaultValueProducers = arrProducers.map(function(item) {return {'value': item, 'label': item}})};
      
      let defaultValueCategories = [];
      if(arrCategories.length !== 0) {defaultValueCategories = arrCategories.map(function(item) {return {'value': item, 'label': item}})};
      
      let defaultValueModels = [];
      if(arrModels.length !==0) {defaultValueModels = arrModels.map(function(item) {return {'value': item, 'label': item}})};

      let defaultValueColours = this.state.shoesColoursFiltered;
      if(arrColours.length !== 0) {defaultValueColours.forEach(element => {
        if (arrColours.includes(element.colour)) {element.isChecked = true}
      })};
      
      //console.log('defaultValueColours(before): ', defaultValueColours);

      // defaultValueColours.forEach(colour => colour.isChecked = true)
      // console.log('defaultValueColours(after): ', defaultValueColours);

      this.setState({
        shoesManufacturersFiltered: defaultValueProducers,
        shoesCategoriesFiltered: defaultValueCategories,
        shoesModelsFiltered: defaultValueModels,
        shoesColoursFiltered: defaultValueColours
      });
      // console.log('this.state.shoesColoursFiltered in componentDidMount',  this.state.shoesColoursFiltered)
      this.colourList()
  }

  render() {
    
    return (
      <aside className="filter">
        <section className="search-by">
          <button className="search-by__button" type="button" value="clear" onClick={this.clearAllFilters}>Clear Filters</button>
          <p className="search-by__header filter-headers">Search by shoes model</p>
          <span className="search-by__input-section">
            <input className="search-by__input" type="text" name="search" placeholder="Enter text" onChange={this.handleByTyping}></input>
            <span onclick="var input = this.previousSibling; input.value = ''; input.focus();"></span>
          </span>
            
        </section>  
        <section className="filter-by">
          <div className="filter-headers">Brand Name
            <Select 
              placeholder='All Brands'
              closeMenuOnSelect={false} 
              components={animatedComponents} 
              value={this.state.shoesManufacturersFiltered} //сюда надо забить URL defaulutValueProducers
              isMulti
              onChange = {this.handleChosenProducers}
              options={shoesManufacturers} 
            />
          </div>  
        </section>
        <section className="filter__by-type">
          <div className="filter-headers">Type of shoes
            <Select 
              placeholder='All types'
              closeMenuOnSelect={false}
              components={animatedComponents}
              value={this.state.shoesCategoriesFiltered}
              isMulti
              options={shoesCategories}
              onChange={this.handleChosenCategories}
            />
          </div>
        </section>
        <section className="filter__by-model">
          <div className="filter-headers">Model of shoes
            <Select 
              placeholder='All Models'
              closeMenuOnSelect={false}
              components={animatedComponents}
              value={this.state.shoesModelsFiltered}
              isMulti
              options={this.state.shoesModelsToFilter} 
              onChange={this.handleChosenModels}
            />
          </div>  
        </section>
        
        <div className="by-colour__header filter-headers">Choose your colour</div>
        <section className='by-colour__filter'>    
          {this.colourList()} 
        </section>
        <div className="by-size__header filter-headers">Choose your size</div>
        <section className='by-size__filter'>    
          {this.sizeList()} 
        </section>
      
      </aside>
    )
  }
}

export default withRouter(Filter); 