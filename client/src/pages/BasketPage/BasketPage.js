import React from 'react';
import axios from 'axios';
import './BasketPage.scss'
import InventoryToBuy from './components/InventoryToBuy';

const API_URL = process.env.REACT_APP_API_URL;

class BasketPage extends React.Component {
  state = {
    shoesInBasket: []
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
  }

  componentDidMount() {
    this.fetchShoesToBuy();
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
    // console.log('this.state.shoesInBasket', this.state.shoesInBasket);
    return (
      <>
        <div className="body-basket">{this.listOfInventory()}</div>
      </>
      
    )
  }
}

export default BasketPage;