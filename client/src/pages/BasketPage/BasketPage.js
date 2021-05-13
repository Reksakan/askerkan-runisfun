import React from 'react';
import axios from 'axios';
import './BasketPage.scss'
import InventoryToBuy from './components/InventoryToBuy';
import { shoesChosenIDs } from './BasketPageAdd';

const API_URL = process.env.REACT_APP_API_URL; 

class BasketPage extends React.Component {
  state = {
    shoesInBasket: [], //just 3 parameters
    shoesInitial: [],
    shoesFinal: []
  };

  fetchShoesToBuy() {
    axios
    .get(`${API_URL}/basket`)
    .then(response => {
      this.setState({
        shoesInBasket: response.data
      })
    })
    .catch(error => {window.alert(error)})
    
    axios
    .get(`${API_URL}/`)
    .then(response => {
        this.setState({
          shoesInitial: response.data
        })
    })
    .catch(error => {window.alert(error)})    
  }

  componentDidMount() {
    this.fetchShoesToBuy();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.shoesInitial !== this.state.shoesInitial) {
      const outPut = this.filterShoes();
      console.log('outPut:', outPut)
      console.log('prevState.shoesInitial: ',  prevState.shoesInitial)
      console.log('state.shoesInitial: ', this.state.shoesInitial)
      this.setState({
        shoesFinal: outPut
      })
      
    }
    console.log('this.state.shoesFinal in componentDidUpdate: ', this.state.shoesFinal)
  }

  filterShoes() {    
    const shoes1 = this.state.shoesInBasket.map(shoe => {
      return {idUnique: shoe.idUnique, idIntChosen: shoe.idInt, ...this.state.shoesInitial.find(t => t.id === shoe.idShoe)}
    })
    const shoes2 = shoes1.map(shoe => {
      shoe.types = shoe.types.find(type => type.idInt === shoe.idIntChosen)
      return (shoe);
    })
    return shoes2;
  } 

  listOfInventory() {
      const inventoryList = this.state.shoesFinal.map(item => {
        return <InventoryToBuy 
        id={item.idShoe}
        key={item.idUnique}
        name={item.name}
        producer={item.producer}
        description={item.description}
        price={item.price}
        picture={item.picture}/>
      })
      return inventoryList;
  }

  render() {
    return (
      <>
        <div className="body-basket">{this.listOfInventory()}</div>
      </>
      
    )
  }
}

export default BasketPage;