import React from 'react';
import axios from 'axios';
import Select from 'react-select';
import qs from 'qs';
import './ProductFilter.scss';
import makeAnimated from 'react-select/animated';
import shoesGenders from './dataGender';
import { withRouter } from "react-router";


const animatedComponents = makeAnimated();
const API_URL = process.env.REACT_APP_API_URL;

class ProductFilter extends React.Component {
  state = {
    productChosen: {},
    productGendersFiltered: [],
    productFiltered: []
  }

  fetchShoe(id) {
    const shoeID = id;
    axios
    .get(`${API_URL}/${shoeID}`)
    .then(response => {
      console.log('Response: ', response.data[0])
      this.setState({
        productFiltered: response.data[0]
      })
    })
    .catch(error => {window.alert(error)})
  }
  
  clearChosenFilters = (e) => {
    this.setState({
      productGendersFiltered: []
    })
    this.populateURLProduct();
  }

  // clearFilters = (e) => {} 
  handleChosenGender = (e) => {
    let productGendersFiltered = [];
    if (e !== null) {productGendersFiltered = e};
    this.setState({
      productGendersFiltered: productGendersFiltered
    });
    console.log('e from handleChosenGender: ', e);                                                //delete
    console.log('productGendersFiltered in the State: ', productGendersFiltered);                 //delete
  }

  populateURLProduct = () => {
    // const finalShoeID = this.state.
    //const productURLParams = this.state.productChosen;
    const productURLID = this.state.productChosen.id;
    const productURLName = this.state.productChosen.name;
    const finalURLGender = this.state.productGendersFiltered.map(gender => gender.value);

    const productURLParams = {};
    productURLParams.id = productURLID; 
    productURLParams.name = productURLName; 
    if(finalURLGender.length > 0) {productURLParams.gender = finalURLGender};
    const strProduct = qs.stringify(productURLParams, { addQueryPrefix: true, arrayFormat: 'comma', encode: false});
    this.props.history.push(strProduct);
    
    console.log('finalURLGender in populateURLProduct: ', finalURLGender);                        //delete
    console.log('productURLParams: ', productURLParams);                                          //delete
    console.log('str: ', strProduct);                                                                    //delete
    console.log('this.props.history:  ', this.props.history);                                     //delete
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.productGendersFiltered !== this.state.productGendersFiltered) {
      this.populateURLProduct();
    }  
    // if (this.state.productChosen.id !== undefined 
    //   && this.state.productChosen.id !== null) 
    //   {gender = this.state.shoesManufacturersFiltered.map(item => item.value)} 
  }

  componentDidMount() {
    const productChosen = qs.parse(this.props.location.search, {comma: true, ignoreQueryPrefix: true});
    this.setState({
      productChosen: productChosen
    }) 
      
    this.fetchShoe(productChosen.id);
  
    
    console.log('productChosen in componentDidMount: ', productChosen);
    console.log('Product fetched from the DataBase: ', this.state.productFiltered);
  }

  render() {
    return (
      <aside>
        <button className="filter-by__button-product" type="button" value="clear" onClick={this.clearChosenFilters}>Clear Filters</button>
        <div className="filter-by__gender">
        Gender
        <Select 
          placeholer = 'Adults'
          closeMenuOnSelect = {false}
          components = {animatedComponents}
          value = {this.state.productGendersFiltered}
          isMulti
          onChange = {this.handleChosenGender}
          options = {shoesGenders} 
        />
      </div>
      </aside>
    )
  }

}

export default withRouter(ProductFilter);