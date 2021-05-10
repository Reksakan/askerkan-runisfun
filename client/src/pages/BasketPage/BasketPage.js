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

  componentDidUpdate() {
    if (this.state.shoesInBasket.length > 0 && this.state.shoesInitial.length > 0) {
      this.filterShoes()
    }
  }

  filterShoes() {    
    const shoes1 = this.state.shoesInBasket.map(shoe => {
      return {idUnique: shoe.idUnique, idIntChosen: shoe.idInt, ...this.state.shoesInitial.filter(t => t.id === shoe.idShoe)[0]}
    })
    const shoes2 = shoes1.map(shoe => {
      shoe.types = shoe.types.filter(type => type.idInt === shoe.idIntChosen)[0]
      return (shoe);
    })
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