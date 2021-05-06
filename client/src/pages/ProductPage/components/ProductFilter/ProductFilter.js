import React from 'react';
import axios from 'axios';
import Select from 'react-select';
import qs from 'qs';
import makeAnimated from 'react-select/animated';
import { withRouter } from "react-router";
import {parse, v4 as uuidv4} from 'uuid';
import ShoeVariants from '../ShoeVariants/ShoeVariants';
import './ProductFilter.scss';
import { parseParams } from './ProductFilterAdd';


const animatedComponents = makeAnimated();
const API_URL = process.env.REACT_APP_API_URL;

class ProductFilter extends React.Component {
  state = {
    product: [],
    productBasket: {},
    productTypes: [],
    productTypesToBuy: [],
    
    productColoursFiltered: [],
    productSizesFiltered: [],
    colours: [],
    sizes: []
  }

  
  fetchShoe(id) {
    const shoeID = id;
    axios
    .get(`${API_URL}/${shoeID}`)
    .then(response => {

      const coloursAll = response.data[0].types.map(function(item) {return item.colour});
      const colour = coloursAll.reduce((colours, colour) => (colours.includes(colour) ? colours : [...colours, colour]), []).sort();
      const colours = colour.map(function(item) {return {'value': item, 'label': item}})

      const sizesAll = response.data[0].types.map(function(item) {return item.size});
      const size = sizesAll.reduce((sizes, size) => (sizes.includes(size) ? sizes : [...sizes, size]), []).sort();
      var sizes = size.map(function(item) {return {'value': item, 'label': item}})

      let product = response.data[0]
      let productTypes = product.types;
      delete product.types;

      const productBasket = {
        "id": product.id,
        "name": product.name,
        "producer" : product.producer,
        "price" : product.price,
        "gender" : product.gender,
        "description": product.description,
        "categories": product.categories,
        "link" : product.link,
        "picture" : product.picture
      }
      
      this.setState({
        product: product,
        productBasket: productBasket,
        productTypes: productTypes,
        colours: colours,
        sizes: sizes
      })
    })
    .catch(error => {window.alert(error)})
  }
  
  clearChosenFilters = (e) => {
    this.setState({
      productColoursFiltered: [],
      productSizesFiltered: []
    })
    this.populateURLProduct();
  }

  sendToBasket = (e) => {
    const productBought = {...{idBought: uuidv4()},...this.state.productBasket, ...{types: this.state.productTypesToBuy}} ;
    axios
    .post(`${API_URL}/basket`, productBought)
    .then((res) => {console.log('res.data from server: ', res.data)})
    .catch(error => {window.alert(error)})
  }

  handleChosenColour = (e) => {
    let productColoursFiltered = [];
    if (e !== null) {productColoursFiltered = e};
    this.setState({
      productColoursFiltered: productColoursFiltered
    });
  }

  handleChosenSize = (e) => {
    let productSizesFiltered = [];
    if (e !== null) {productSizesFiltered = e};
    this.setState({
      productSizesFiltered: productSizesFiltered
    });
  }


  populateURLProduct = () => {
    const productURLID = this.state.product.id;
    const productURLName = this.state.product.name;
    const productURLColour = this.state.productColoursFiltered.map(colour => colour.value);
    const productURLSize = this.state.productSizesFiltered.map(size => size.value)

    const productURLParams = {};
    productURLParams.id = productURLID; 
    productURLParams.name = productURLName; 
    
    if(productURLColour.length > 0) {productURLParams.colour = productURLColour};
    if(productURLSize.length > 0) {productURLParams.size = productURLSize};
    const strProduct = qs.stringify(productURLParams, { addQueryPrefix: true, arrayFormat: 'comma', encode: false});
    this.props.history.push(strProduct);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.productColoursFiltered !== this.state.productColoursFiltered
      || prevState.productSizesFiltered !== this.state.productSizesFiltered) {
        this.populateURLProduct();
        this.productSelected();
    }  

    if (prevState.productColoursFiltered !== this.state.productColoursFiltered) {
      
      let coloursArr =[];
      if (this.state.productColoursFiltered.length === 0) 
        {
          let productTypesToBuy = this.state.productTypes;
          const sizes = productTypesToBuy
          .map(function(item) {return item.size})
          .reduce((sizes, size) => (sizes.includes(size) ? sizes : [...sizes, size]), []).sort()
          .map(function(item) {return {'value': item, 'label': item}})

        this.setState({
          productTypesToBuy: productTypesToBuy,
          sizes: sizes
        })}
      else {
        coloursArr = this.state.productColoursFiltered.map(colour => colour.value)
        let productTypesToBuy = this.state.productTypes.filter(shoeType => (
          coloursArr.includes(shoeType.colour)
        ))
        const sizes = productTypesToBuy
        .map(function(item) {return item.size})
        .reduce((sizes, size) => (sizes.includes(size) ? sizes : [...sizes, size]), []).sort()
        .map(function(item) {return {'value': item, 'label': item}})

        this.setState({
          productTypesToBuy: productTypesToBuy,
          sizes: sizes
        })
      }
    }
    if (prevState.productSizesFiltered !== this.state.productSizesFiltered) {
      let sizesArr =[];
      if (this.state.productSizesFiltered.length === 0) 
        {
          let productTypesToBuy = this.state.productTypes;
          const colours = productTypesToBuy
          .map(function(item) {return item.colour})
          .reduce((colours, colour) => (colours.includes(colour) ? colours : [...colours, colour]), []).sort()
          .map(function(item) {return {'value': item, 'label': item}})

        this.setState({
          productTypesToBuy: productTypesToBuy,
          colours: colours
        })}
      else {
        sizesArr = this.state.productSizesFiltered.map(size => size.value)
        let productTypesToBuy = this.state.productTypes.filter(shoeType => (
          sizesArr.includes(shoeType.size)
        ))
        const colours = productTypesToBuy
        .map(function(item) {return item.colour})
        .reduce((colours, colour) => (colours.includes(colour) ? colours : [...colours, colour]), []).sort()
        .map(function(item) {return {'value': item, 'label': item}})

        this.setState({
          productTypesToBuy: productTypesToBuy,
          colours: colours
        })
      }
    }
  }

  componentDidMount() {
    const productChosen = qs.parse(this.props.location.search, {comma: true, ignoreQueryPrefix: true});
    console.log('productChosen in componentDidMount: ', productChosen)
    const urlParams = parseParams(productChosen);
    console.log('urlParams in componentDidMount: ', urlParams)
    this.setState({
      product: urlParams.product,
      productColoursFiltered: urlParams.defaultValueColours,
      productSizesFiltered: urlParams.defaultValueSizes
    }) 
    this.fetchShoe(productChosen.id);
    this.productSelected();
  }

  productSelected = () => {
    const productChosen = qs.parse(this.props.location.search, {comma: true, ignoreQueryPrefix: true});
    const urlParams = parseParams(productChosen);
    const colours = this.state.productColoursFiltered.map(colour => colour.value)
    const sizes = this.state.productSizesFiltered.map(size => size.value)
    const productTypesToBuy = this.state.productTypes.filter(shoe => (
      (colours.length == 0 || colours.includes(shoe.colour))
      && (sizes.length == 0 || sizes.includes(shoe.size))
    ))
      let productSelected = productTypesToBuy.map(item => {
      return (
      <ShoeVariants item={item} gender={this.state.product.gender}/>)
    })
    return productSelected;
  }

  render() {
    return (
      <div className="filter-by">
        <button className="filter-by__button-product" type="button" value="clear" onClick={this.clearChosenFilters}>CLEAR FILTERS</button>
        <div className="filter-by__gender">
          Colour
          <Select 
            placeholer = 'Adults'
            closeMenuOnSelect = {false}
            components = {animatedComponents}
            value = {this.state.productColoursFiltered}
            isMulti
            onChange = {this.handleChosenColour}
            options = {this.state.colours} 
          />
        </div>
        <div className="filter-by__gender">
          Sizes
          <Select 
            placeholer = 'Adults'
            closeMenuOnSelect = {false}
            components = {animatedComponents}
            value = {this.state.productSizesFiltered}
            isMulti
            onChange = {this.handleChosenSize}
            options = {this.state.sizes} 
          />
        </div>
        <div className="filter-result">{this.productSelected()}</div>
        <button className="filter-by__button-product" type="button" value="clear" onClick={this.sendToBasket}>ADD TO BASKET</button>
      </div>
    )
  }

}

export default withRouter(ProductFilter);