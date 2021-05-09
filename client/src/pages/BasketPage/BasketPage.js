import React from 'react';
import axios from 'axios';
import './BasketPage.scss'
import InventoryToBuy from './components/InventoryToBuy';
import { shoesChosenIDs } from './BasketPageAdd';

const API_URL = process.env.REACT_APP_API_URL; 

class BasketPage extends React.Component {
  state = {
    shoesInBasket: [],
    shoesInitial: []
  };

  fetchShoesToBuy() {
    axios
    .get(`${API_URL}/basket`)
    .then(response => {
      console.log('shoesInBasket: ', response.data)   //DELETE
      // if (response.data.length > 0) {
      //   this.filterShoes();
      // }
      this.setState({
        shoesInBasket: response.data
      })
    })
    .catch(error => {window.alert(error)})
    
    axios
    .get(`${API_URL}/`)
    .then(response => {
        console.log('shoesInitial: ', response.data)  //DELETE
        this.setState({
          shoesInitial: response.data
        })
    })
    .catch(error => {window.alert(error)})    
  }

  componentDidMount() {
    this.fetchShoesToBuy();
  }

  componentDidUpdate() {
    if (this.state.shoesInBasket.length > 0 && this.state.shoesInitial) {
      this.filterShoes()
    }
  }

  filterShoes() {    
    console.log('this.state.shoesInBasket', this.state.shoesInBasket)
    const shoesChosen = shoesChosenIDs(this.state.shoesInBasket);
    console.log('shoesChosen: ', shoesChosen)
    const shoes = this.state.shoesInBasket.map(shoe => {
      return this.state.shoesInitial.filter(t => t.id == shoe.idShoe)
    })
    console.log('shoes: ', shoes)
  } 

  listOfInventory() {
    const inventoryList = this.state.shoesInBasket.map(inventory => {
      return <InventoryToBuy 
      id={inventory.id}
      key={inventory.id}
      name={inventory.name}
      producer={inventory.producer}
      description={inventory.description}
      price={inventory.price}
      picture={inventory.picture}/>
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