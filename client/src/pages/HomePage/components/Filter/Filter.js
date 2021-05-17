import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import qs from 'qs';
import './Filter.scss';
import shoesManufacturers from './dataShoesManufacturer';
import shoesGender from './dataShoesGender';
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
    shoesGenderFiltered: [],
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
      shoesGenderFiltered: [],
      shoesManufacturersFiltered: [],
      shoesCategoriesFiltered: [],
      shoesModelsFiltered: [],
      shoesColoursFiltered: shoesColoursFiltered,
      shoesSizesFiltered: shoesSizes
    })
    this.populateURL();
  }  

  //Works only for computers, doesn't work for other gadgets
   handleByTyping = (e) => {
     const searchParameter = e.target.value.trim();
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
  
   handleChosenGender = (e) => {
    let shoesGenderFiltered=[];
    if(e !== null) {shoesGenderFiltered = e};
    this.setState({shoesGenderFiltered: shoesGenderFiltered});
    this.populateURL();
  }

   handleChosenProducers = (e) => {
    let shoesManufacturersFiltered=[];
    if(e !== null) {shoesManufacturersFiltered = e};
    this.setState({shoesManufacturersFiltered: shoesManufacturersFiltered});
    this.populateURL();
  } 

  handleChosenCategories = (e) => {
    let shoesCategoriesFiltered=[];
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
    console.log('Colors in State (shoesColoursFiltered): ', this.state.shoesColoursFiltered);
    this.populateURL();
    // this.colourList();
  }

  handleChosenSizes = (e) => {
    let shoesSizesFiltered = this.state.shoesSizesFiltered;
    shoesSizesFiltered.forEach(size => {if(size.size === e.target.value) size.isChecked = e.target.checked})
    this.setState({shoesSizesFiltered: shoesSizesFiltered});
    this.populateURL();
    
  }
  
  populateURL = () => {
    const finalURLGender = this.state.shoesGenderFiltered.map(gender => gender.value)
    const finalURLManufacturers = this.state.shoesManufacturersFiltered.map(brand => brand.value);
    const finalURLCategories = this.state.shoesCategoriesFiltered.map(category => category.value);
    const finalURLModels = this.state.shoesModelsFiltered.map(model => model.value);
    const finalURLColours = this.state.shoesColoursFiltered.filter(colour => colour.isChecked === true).map(colour => colour.colour);
    const finalURLSizes = this.state.shoesSizesFiltered.filter(size => size.isChecked === true).map(size => size.size);

    const URLParams = {}; 
    if(finalURLGender.length > 0) {URLParams.gender = finalURLGender}
    if(finalURLManufacturers.length > 0) {URLParams.producer = finalURLManufacturers}
    if(finalURLCategories.length > 0) {URLParams.categories = finalURLCategories}
    if(finalURLModels.length > 0) {URLParams.name = finalURLModels}
    if(finalURLColours.length > 0) {URLParams.colour = finalURLColours}
    if(finalURLSizes.length > 0) {URLParams.size = finalURLSizes}
    const str = qs.stringify(URLParams, { addQueryPrefix: true, arrayFormat: 'comma', encode: false });                                                                      //delete
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
    if(prevState.shoesGenderFiltered !== this.state.shoesGenderFiltered 
      || prevState.shoesManufacturersFiltered !== this.state.shoesManufacturersFiltered 
      || prevState.shoesCategoriesFiltered !== this.state.shoesCategoriesFiltered
      || prevState.shoesModelsFiltered !== this.state.shoesModelsFiltered 
      || prevState.shoesColoursFiltered !== this.state.shoesColoursFiltered
    ) {
      this.populateURL();
      let shoesModelsPrevFiltered = [];
      let shoesModelsPostFiltered = [];
      let gender = [];
      let manufacturers = [];
      let categories =[];
      // let colours = [];
      // let sizes = [];
      
      //If похожи. поэтому можно вынести в отедельную ф-цию.
      if (this.state.shoesGenderFiltered !== undefined 
        && this.state.shoesGenderFiltered.length !== null) 
        {gender = this.state.shoesGenderFiltered.map(gender => gender.value)} 

      if (this.state.shoesManufacturersFiltered !== undefined 
        && this.state.shoesManufacturersFiltered.length !== null) 
        {manufacturers = this.state.shoesManufacturersFiltered.map(item => item.value)} 

      if (this.state.shoesCategoriesFiltered !== undefined 
        && this.state.shoesCategoriesFiltered.length !== null) 
        {categories = this.state.shoesCategoriesFiltered.map(item => item.value)} 

        shoesModelsPrevFiltered = shoesModels.filter(shoe => (
        (gender.length == 0 || gender.includes(shoe.company)) 
        && (manufacturers.length == 0 || manufacturers.includes(shoe.company)) 
        && (categories.length == 0 || categories.includes(shoe.category))));

      shoesModelsPostFiltered = shoesModelsPrevFiltered.map(function(item) {return {'value': item.label, 'label': item.label}})  

      this.setState({
        shoesModelsToFilter: shoesModelsPostFiltered
      });
    }
  }

  componentDidMount(){
      const URL = qs.parse(this.props.location.search, { comma: true, ignoreQueryPrefix: true });
      const arrGender = URL.gender === undefined ? [] : Array.isArray(URL.gender) ? URL.gender : [URL.gender];
      const arrProducers = URL.producer === undefined ? [] : Array.isArray(URL.producer) ? URL.producer : [URL.producer];
      const arrCategories = URL.categories === undefined ? [] : Array.isArray(URL.categories) ? URL.categories : [URL.categories]; 
      const arrModels = URL.name === undefined ? [] : Array.isArray(URL.name) ? URL.name : [URL.name];
      const arrColours = URL.colour === undefined ? [] : Array.isArray(URL.colour) ? URL.colour : [URL.colour];
      const arrSizes = URL.size === undefined ? [] : Array.isArray(URL.size) ? URL.size : [URL.size];
      
      let defaultValueGender = [];
      if (arrGender.length !== 0) {defaultValueGender = arrGender.map(function(item) {return {'value': item, 'label': item}})};

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

      let defaultValueSizes = this.state.shoesSizesFiltered;
      if(arrSizes.length !== 0) {defaultValueSizes.forEach(element => {
        if (arrSizes.includes(element.size)) {element.isChecked = true}
      })};

      this.setState({
        shoesGenderFiltered: defaultValueGender,
        shoesManufacturersFiltered: defaultValueProducers,
        shoesCategoriesFiltered: defaultValueCategories,
        shoesModelsFiltered: defaultValueModels,
        shoesColoursFiltered: defaultValueColours,
        shoesSizesFiltered: defaultValueSizes
      });
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
            <span onClick="var input = this.previousSibling; input.value = ''; input.focus();"></span>
          </span>
        </section>  
        <section className="filter-by-gender">
          <div className="filter-headers">Gender
            <Select 
              placeholder='Gender'
              closeMenuOnSelect={false} 
              components={animatedComponents} 
              value={this.state.shoesGenderFiltered} 
              isMulti
              onChange = {this.handleChosenGender}
              options={shoesGender} 
            />
          </div>  
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