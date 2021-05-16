import React from 'react';
import axios from 'axios';
import './BasketPage.scss'
import InventoryToBuy from './components/InventoryToBuy';

const API_URL = process.env.REACT_APP_API_URL; 

class BasketPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoesInBasket: [], //just 3 parameters
      shoesInitial: [],
      shoesFinal: []
    };  
    this.deleteShoe = this.deleteShoe.bind(this);
  }
  
  
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
      this.setState({
        shoesFinal: outPut
      })      
    }
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

  deleteShoe(idUnique) {
    axios
    .delete(`${API_URL}/basket/${idUnique}`)
    .then(response => {
      axios
      .get(`${API_URL}/basket`)
      .then(res => {
        this.setState({
          shoesInBasket: res.data
        })
      })
      .then(resp=> {
        const outPut = this.filterShoes();
        this.setState({
          shoesFinal: outPut
        })
      })
      .catch(error => {
        window.alert(error)
      })
    })
    .catch(error => {
      window.alert(error)
    })
  }

  listOfInventory() {
    const inventoryList = this.state.shoesFinal.map(item => {
      return <InventoryToBuy 
      id={item.idShoe}
      idUnique={item.idUnique}
      name={item.name}
      producer={item.producer}
      description={item.description}
      price={item.price}
      picture={item.picture}
      onClick={this.deleteShoe}/>
    })
    return inventoryList;
  }

  render() {
    return (
      <>
        <button className="body-button">BUY</button>
        <div className="body-basket">{this.listOfInventory()}</div>
      </>
      
    )
  }
}

export default BasketPage;