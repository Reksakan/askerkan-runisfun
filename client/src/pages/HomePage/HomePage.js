import React from 'react';
import axios from 'axios';
import qs from 'qs';
import Filter from './components/Filter/Filter';
import Card from './components/Card/Card';
import ProductPage from '../ProductPage/ProductPage';
import './HomePage.scss';

const API_URL = process.env.REACT_APP_API_URL;

class HomePage extends React.Component {
    state = {
      urlInitShoes: '',
      shoesInitial: [],
      shoesFiltered: []
    };

  fetchShoes() {
    axios
    .get(`${API_URL}/`)
    .then(response => {
        this.setState({
          shoesInitial: response.data
        })
        if(this.state.shoesInitial.length > 0) {
          this.filterShoes()}
    })
    .catch(error => {window.alert(error)}) 
  }

  componentDidMount() {
    const urlInitShoes = this.props.location.search;
    this.fetchShoes();
    this.setState({
      urlInitShoes: urlInitShoes
    })
    
  }

  componentDidUpdate() {
    //console.log('prevProps:', prevProps)                                                        //DELETE
    if(this.state.urlInitShoes !== this.props.location.search) {
      this.filterShoes();
      //console.log('this.state.shoes in componentDidUpdate', this.state.shoesInitial)
      this.listOfShoes();
      this.setState({
        urlInitShoes: this.props.location.search
      })
    }
  }
  
  filterShoes() {
    const URL = qs.parse(this.props.location.search, { comma: true, ignoreQueryPrefix: true });
    console.log('URL: ', URL);                                                              //DELETE
    const arrProducers = URL.producer === undefined ? [] : Array.isArray(URL.producer) ? URL.producer : [URL.producer];
    const arrCategories = URL.categories === undefined ? [] : Array.isArray(URL.categories) ? URL.categories : [URL.categories]; 
    const arrModels = URL.name === undefined ? [] : Array.isArray(URL.name) ? URL.name : [URL.name];
    const arrColours = URL.colour === undefined ? [] : Array.isArray(URL.colour) ? URL.colour : [URL.colour];
    //const arrSizes = URL.size === undefined ? [] : Array.isArray(URL.size) ? URL.size : [URL.size];
    
    // console.log('---Start---');
    // console.log('this.state.shoesInitial', this.state.shoesInitial);
    // console.log('arrProducers: ', arrProducers);                                              //DELETE
    // console.log('arrCategories: ', arrCategories);
    // console.log('arrModels: ', arrModels);
    // console.log('arrColours: ', arrColours);
    // console.log('---END---');
    
    let shoesFiltered=this.state.shoesInitial;
    if (arrProducers.length === 0 && arrCategories.length === 0 && arrModels.length === 0) {                                                                                     //arrProducers.length < 1 && arrCategories.length < 1 && arrModels.length < 1 && arrColours.length < 1
      shoesFiltered = this.state.shoesInitial;
      //console.log('shoesFiltered in Filter', shoesFiltered);
    }
    else {
      if (arrProducers.length > 0) {
        shoesFiltered = shoesFiltered.filter(shoe => { 
          /* console.log("shoe", shoe)
          const typeColour = shoe.types.map(type => type.colour); 
          const typeSize = shoe.types.map(type => type.size); */
          if(arrProducers.includes(shoe.producer.toLowerCase())) {return shoe}
        })
      }
      
      if (arrCategories.length > 0) {
        shoesFiltered = shoesFiltered.filter(shoe => {
          if(arrCategories.includes(shoe.categories)) {return shoe}
        })
      }

      if (arrModels.length > 0) {
        shoesFiltered = shoesFiltered.filter(shoe => {
          if(arrModels.includes(shoe.name)) {return shoe}
        })
      }
      
      if (arrColours.length > 0) {
        
        shoesFiltered = shoesFiltered.filter(shoe => {
          const typeColour = shoe.types.map(type => type.colour);
          // console.log('typeColour:  ', typeColour);
          if(arrColours.filter(colour => typeColour.includes(colour))) {return shoe}
        })
      }
      
    }
      
   //console.log('shoesFiltered: ', shoesFiltered);                                                                              //DELETE
    this.setState({
      shoesFiltered: shoesFiltered
    })
  }
  
  addShoe=(e)=>{
    e.preventDefault();
    const shoe = this.state.shoesFiltered.filter(shoe => {if (shoe.id === e.target.value) return shoe})[0];
    const shoeToBuy = {
      "id": shoe.id,
      "name": shoe.name,
      "producer" : shoe.producer,
      "price" : shoe.price,
      "description": shoe.description,
      "categories": shoe.categories,
      "link" : shoe.link,
      "picture" : shoe.picture,
      "types" : []
    }
    axios
      .post(`${API_URL}/basket/`, shoeToBuy)
      .then((res) => {console.log('res.data from server: ', res.data)})
      .catch(error => {window.alert(error)})
  }

  // viewDetails = (e) => {
  //   e.preventDefault();
  //   console.log('e.target.value again: ', e.target.value);
  //   return(
  //     <Navbar.Brand href="/description">
  //       <ProductPage id={e.target.value}/> 
  //     </Navbar.Brand>
  //   )
  // }


  listOfShoes() {
    const shoesList = this.state.shoesFiltered.map(shoe => {
      return <Card 
      className="card-container"
      id = {shoe.id}
      key = {shoe.id}
      name={shoe.name}
      category={shoe.categories}
      producer={shoe.producer}
      price = {shoe.price}
      picture = {shoe.picture}
      link = {shoe.link}
      // callAdd = {this.addShoe}
      viewDetailsId = {shoe.id}
      shoeTypes = {shoe.types}/>
    })
    return shoesList;
  }
  
  render() {
    return (
      <>
        <div className="body">
          <Filter />
          <div className="body__shoes">
            {this.listOfShoes()}
          </div>
        </div>
      </>
    )
  }
}

export default HomePage;