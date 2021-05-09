import React from 'react';
import axios from 'axios';
import Select from 'react-select';
import qs from 'qs';
import makeAnimated from 'react-select/animated';
import { withRouter } from "react-router";
import {parse, v4 as uuidv4} from 'uuid';
import ShoeVariants from '../ShoeVariants/ShoeVariants';
import './ProductFilter.scss';
import { parseParams, selectComponentInput} from './ProductFilterAdd';


const animatedComponents = makeAnimated();
const API_URL = process.env.REACT_APP_API_URL;

class ProductFilter extends React.Component {
  state = {
    product: [],
    productTypes: [],
    productTypesFiltered: [],
    productSentToBasket:{},
    
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
      let product = response.data[0]
      let productTypes = product.types;
      const colours = selectComponentInput(productTypes, 'colour').dataSelectedOutput;
      const sizes = selectComponentInput(productTypes, 'size').dataSelectedOutput;
      
      this.setState({
        product: product,
        productTypes: productTypes,
        colours: colours,
        sizes: sizes
      })
    })
    .catch(error => {window.alert(error)})
  }
  
  sendToBasket = (e) => {
    const productChosen = qs.parse(this.props.location.search, {comma: true, ignoreQueryPrefix: true});
    const urlParams = parseParams(productChosen);    
    const productTypesFiltered = this.state.productTypes.filter(shoe => (
      (urlParams.arrColour.length == 0 || urlParams.arrColour.includes(shoe.colour))
      && (urlParams.arrSize.length == 0 || urlParams.arrSize.includes(shoe.size))
    )) 
    
    const productTypeChosen = productTypesFiltered.map(item => item.idInt);
    if (productTypeChosen.length === 1) {
      const productBought = {idUnique: uuidv4(), idShoe: this.state.product.id, idInt: productTypeChosen[0]} ;
      axios
      .post(`${API_URL}/basket`, productBought)
      .then((res) => {console.log('res.data from server: ', res.data)})
      .catch(error => {window.alert(error)})
      alert("Shoe added to the basket")
    }
    else {
      alert("Please choose only one product")
    }
  }

  clearChosenFilters = (e) => {
    this.setState({
      productColoursFiltered: [],
      productSizesFiltered: []
    })
    this.populateURLProduct();
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
          let productTypesFiltered = this.state.productTypes;
          const sizes = selectComponentInput(productTypesFiltered, 'size').dataSelectedOutput
          this.setState({
            productTypesFiltered: productTypesFiltered,
            sizes: sizes
          })
        }
      else {
        coloursArr = this.state.productColoursFiltered.map(colour => colour.value)
        let productTypesFiltered = this.state.productTypes.filter(shoeType => (
          coloursArr.includes(shoeType.colour)
        ))
        const sizes = selectComponentInput(productTypesFiltered, 'size').dataSelectedOutput
        this.setState({
          productTypesFiltered: productTypesFiltered,
          sizes: sizes
        })
      }
    }
    if (prevState.productSizesFiltered !== this.state.productSizesFiltered) {
      let sizesArr =[];
      if (this.state.productSizesFiltered.length === 0) 
        {
          let productTypesFiltered = this.state.productTypes;
          const colours = selectComponentInput(productTypesFiltered, 'colour').dataSelectedOutput;
          this.setState({
            productTypesFiltered: productTypesFiltered,
            colours: colours
          })
        }
      else {
        sizesArr = this.state.productSizesFiltered.map(size => size.value)
        let productTypesFiltered = this.state.productTypes.filter(shoeType => (
          sizesArr.includes(shoeType.size)
        ))
        const colours = selectComponentInput(productTypesFiltered, 'colour').dataSelectedOutput;
        this.setState({
          productTypesFiltered: productTypesFiltered,
          colours: colours
        })
      }
    }
  }

  componentDidMount() {
    const productChosen = qs.parse(this.props.location.search, {comma: true, ignoreQueryPrefix: true});
    const urlParams = parseParams(productChosen);
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
    const productTypesFiltered = this.state.productTypes.filter(shoe => (
      (urlParams.arrColour.length == 0 || urlParams.arrColour.includes(shoe.colour))
      && (urlParams.arrSize.length == 0 || urlParams.arrSize.includes(shoe.size))
    ))    
    let productSelected = productTypesFiltered.map(item => {
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