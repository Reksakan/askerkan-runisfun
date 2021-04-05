import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import qs from 'qs';
import './Filter.scss';
import shoesManufacturers from './dataShoesManufacturer.js';
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
    shoesColoursFiltered: shoesColours,
    shoesSizesFiltered: shoesSizes
  }
  
  clearAllFilters = (e) => {
    let shoesColoursFiltered = this.state.shoesColoursFiltered;
    shoesColoursFiltered.forEach(colour => colour.isChecked = false);
    let shoesSizesFiltered = this.state.shoesSizesFiltered;
    shoesSizesFiltered.forEach(size => size.isChecked = false);
    this.setState({
      shoesManufacturersFiltered: [],
      shoesCategoriesFiltered: [],
      shoesModelsFiltered: [],
      shoesColoursFiltered: shoesColoursFiltered,
      shoesSizesFiltered: shoesSizes
    })
    this.populateURL();
    // console.log('this.state.shoesColoursFiltered (from clearAllFilters): ', this.state.shoesColoursFiltered)
  }  

  //Doesn't work properly
   handleByTyping = (e) => {
     const searchParameter = e.target.value.trim();
     //console.log('e which is entered: ', e);
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
    if(e !== null) {shoesManufacturersFiltered = e};
    console.log('handleChosenProducts e: ', e);                                                             //delete
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
    // console.log('e(Colour): ', e);
    // console.log('e.target', e.target);
    // console.log('e.target.value', e.target.value);
    // console.log('e.target.checked: ', e.target.checked);
    let shoesColoursFiltered = this.state.shoesColoursFiltered;
    shoesColoursFiltered.forEach(colour => {if (colour.colour === e.target.value) colour.isChecked = e.target.checked});
    this.setState({shoesColoursFiltered: shoesColoursFiltered});
    console.log('Colors in State (shoesColoursFiltered): ', this.state.shoesColoursFiltered);
    this.populateURL();
    // this.colourList();
  }

  handleChosenSizes = (e) => {
    // console.log('e.target.checked: ', e.target.checked);
    let shoesSizesFiltered = this.state.shoesSizesFiltered;
    shoesSizesFiltered.forEach(size => {if(size.size === e.target.value) size.isChecked = e.target.checked})
    this.setState({shoesSizesFiltered: shoesSizesFiltered});
    this.populateURL();
    
  }
  

  populateURL = () => {
    const finalURLManufacturers = this.state.shoesManufacturersFiltered.map(brand => brand.value);
    console.log('finalURLManufacturers: ', finalURLManufacturers);                                                  //delete
    const finalURLCategories = this.state.shoesCategoriesFiltered.map(category => category.value);
    const finalURLModels = this.state.shoesModelsFiltered.map(model => model.value);
    const finalURLColours = this.state.shoesColoursFiltered.filter(colour => colour.isChecked === true).map(colour => colour.colour);
    const finalURLSizes = this.state.shoesSizesFiltered.filter(size => size.isChecked === true).map(size => size.size);
    //console.log('finalURLModels to Populate to URL', finalURLModels);
    //console.log('shoesModelsFiltered to Populate to URL', this.state.shoesModelsFiltered)

    const URLParams = {}; 
    if(finalURLManufacturers.length > 0) {URLParams.producer = finalURLManufacturers}
    if(finalURLCategories.length > 0) {URLParams.categories = finalURLCategories}
    if(finalURLModels.length > 0) {URLParams.name = finalURLModels}
    if(finalURLColours.length > 0) {URLParams.colour = finalURLColours}
    if(finalURLSizes.length > 0) {URLParams.size = finalURLSizes}
    const str = qs.stringify(URLParams, { addQueryPrefix: true, arrayFormat: 'comma', encode: false });                                                                      //delete
    this.props.history.push(str);
    console.log('str:', str);                                                                                         //delete
    console.log('URLParams: ', URLParams);                                                                            //delete
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
            value={colour.colour}
            checked = {colour.isChecked === true ? true : false}   //checked = {colour.isChecked == true ? true : false}
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
            value={size.size} 
            checked = {size.isChecked === true ? true : false}
            onChange={this.handleChosenSizes} 
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
      || prevState.shoesModelsFiltered !== this.state.shoesModelsFiltered 
      || prevState.shoesColoursFiltered !== this.state.shoesColoursFiltered
    ) {
      this.populateURL();
      let shoesModelsPrevFiltered = [];
      let shoesModelsPostFiltered = [];
      let manufacturers = [];
      let categories =[];
      // let colours = [];
      // let sizes = [];
      
      //If похожи. поэтому можно вынести в отедельную ф-цию.
      if (this.state.shoesManufacturersFiltered !== undefined 
        && this.state.shoesManufacturersFiltered.length !== null) 
        {manufacturers = this.state.shoesManufacturersFiltered.map(item => item.value)} 

      if (this.state.shoesCategoriesFiltered !== undefined 
        && this.state.shoesCategoriesFiltered.length !== null) 
        {categories = this.state.shoesCategoriesFiltered.map(item => item.value)} 
      
        // colours = this.state.shoesColoursFiltered;
        // console.log('colours: ', colours);

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
      // console.log('URL after refresh: ', URL)
      const arrProducers = URL.producer === undefined ? [] : Array.isArray(URL.producer) ? URL.producer : [URL.producer];
      const arrCategories = URL.categories === undefined ? [] : Array.isArray(URL.categories) ? URL.categories : [URL.categories]; 
      const arrModels = URL.name === undefined ? [] : Array.isArray(URL.name) ? URL.name : [URL.name];
      // console.log('URL.colour: ', URL.colour);                                                      //DELETE!!!!!
      const arrColours = URL.colour === undefined ? [] : Array.isArray(URL.colour) ? URL.colour : [URL.colour];
      console.log('arrColours after page refresh: ', arrColours);                                                    //DELETE!!!!!
      const arrSizes = URL.size === undefined ? [] : Array.isArray(URL.size) ? URL.size : [URL.size];
      
      
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

      // console.log('defaultValueColours: ', defaultValueColours)

      let defaultValueSizes = this.state.shoesSizesFiltered;
      if(arrSizes.length !== 0) {defaultValueSizes.forEach(element => {
        if (arrSizes.includes(element.size)) {element.isChecked = true}
      })};

      this.setState({
        shoesManufacturersFiltered: defaultValueProducers,
        shoesCategoriesFiltered: defaultValueCategories,
        shoesModelsFiltered: defaultValueModels,
        shoesColoursFiltered: defaultValueColours,
        shoesSizesFiltered: defaultValueSizes
      });
      // console.log('this.state.shoesColoursFiltered in componentDidMount',  this.state.shoesColoursFiltered)
      this.colourList();
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
              value={this.state.shoesManufacturersFiltered} 
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
      
        {/* <div className="by-colour__header filter-headers">Choose your colour</div>
        <section className='by-colour__filter'>    
          {this.colourList()} 
        </section>
        <div className="by-size__header filter-headers">Choose your size</div>
        <section className='by-size__filter'>    
          {this.sizeList()} 
        </section> */}
      
      </aside>
    )
  }
}

export default withRouter(Filter); 