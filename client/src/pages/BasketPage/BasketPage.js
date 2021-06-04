import React from 'react';
import axios from 'axios';
import './BasketPage.scss'
import InventoryToBuy from './components/InventoryToBuy';

const API_URL = process.env.REACT_APP_API_URL; 

class BasketPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoesInBasket: [], //just 4 parameters
      shoesInitial: [],
      shoesFinal: [],
      shoesStockUpdate: [],

      qtyShoesInBasket: "",
      costShoesInBasket: "",
      hstShoesInBasket: "",
      totalCostShoesInBasket: ""
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
      console.log('outPut: ', outPut);
      const costShoesInBasket = outPut.reduce((acc, item) => {return acc + parseInt(item.price.substring(1))}, 0);
      const hstShoesInBasket = Math.round(costShoesInBasket * 0.13);
      const totalCostShoesInBasket = costShoesInBasket + hstShoesInBasket;
      this.setState({
        shoesFinal: outPut,
        qtyShoesInBasket: outPut.length,
        costShoesInBasket: costShoesInBasket,
        hstShoesInBasket: hstShoesInBasket,
        totalCostShoesInBasket: totalCostShoesInBasket
      })
      console.log('this.state.shoesInitial: ', this.state.shoesInitial) 
    }
  }

  filterShoes() {    
    const shoes1 = this.state.shoesInBasket.map(shoe => {
      return {idUnique: shoe.idUnique, idIntChosen: shoe.idInt, qtyToBuy: shoe.qtyToBuy, ...this.state.shoesInitial.find(t => t.id === shoe.idShoe)}
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
        const costShoesInBasket = outPut.reduce((acc, item) => {return acc + parseInt(item.price.substring(1))}, 0);
        const hstShoesInBasket = Math.round(costShoesInBasket * 0.13); 
        const totalCostShoesInBasket = costShoesInBasket + hstShoesInBasket;
        this.setState({
          shoesFinal: outPut,
          qtyShoesInBasket: outPut.length,
          costShoesInBasket: costShoesInBasket,
          hstShoesInBasket: hstShoesInBasket,
          totalCostShoesInBasket: totalCostShoesInBasket
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

  buyShoes = (e) => {
    if (this.state.shoesInBasket.length === 0) {
      window.alert('Please choose the product to buy')
    } else {
      axios
      .put(`${API_URL}/`, this.state.shoesInBasket)
      .then((response) => {
        console.log('Basket shoes sent to the server: ', response.data)
        window.alert('Thank you for your purchase!')
        this.setState({
          shoesFinal: []
        })
      })      
      .catch(error => {window.alert(error)})
    }
  }

  qtyUp = (idUnique) => {
    const shoes = this.state.shoesFinal.map(shoe => {
      if(shoe.idUnique === idUnique) {
        shoe.qtyToBuy = shoe.qtyToBuy < shoe.types.quantity ? ++shoe.qtyToBuy : shoe.qtyToBuy;
      }
      return shoe;
    });
    console.log('shoes: ', shoes)
    this.setState({
      shoesFinal: shoes
    })
  }

  qtyDown = (idUnique) => {
    const shoes = this.state.shoesFinal.map(shoe => {
      if(shoe.idUnique === idUnique) {
        shoe.qtyToBuy = shoe.qtyToBuy > 1 ? --shoe.qtyToBuy : shoe.qtyToBuy;
      }
      return shoe;
    });
    console.log('shoes: ', shoes)
    this.setState({
      shoesFinal: shoes
    })
  }

  listOfInventory() {
    const inventoryList = this.state.shoesFinal.map(item => {
      return <InventoryToBuy 
      id={item.idShoe}
      idUnique={item.idUnique}
      key={"basket-".concat(item.idUnique)}
      name={item.name}
      producer={item.producer}
      description={item.description}
      price={item.price}
      quantity={item.types.quantity}
      size={item.types.size}
      colour={item.types.colour}
      picture={item.picture}
      qtyToBuy={item.qtyToBuy}
      onClickDelete={this.deleteShoe}
      inClickQtyUp={this.qtyUp}
      inClickQtyDown={this.qtyDown}
      />
    })
    return inventoryList;
  }

  render() {
    return (
      <>
        <div className="body-all">
          <div className="body-buy">
            <p>
              <button className="body-button" type="button" value="submit" onClick={this.buyShoes}>BUY</button>
            </p>
            <div className="body-buy__sum">
              <h1 className="body-buy__header">ORDER SUMMARY</h1>
              <div className="body-buy__items">
                <div>{this.state.qtyShoesInBasket} ITEMS</div>
                <div>$ {this.state.costShoesInBasket}</div>
              </div>
              <div className="body-buy__items">
                <div>DELIVERY</div>
                <div>FREE</div>
              </div>
              <div className="body-buy__items">
                <div>Sales Tax (HST 13%)</div>
                <div>$ {this.state.hstShoesInBasket}</div>
              </div>
              <div className="body-buy__items">
                <div>TOTAL</div>
                <div>$ {this.state.totalCostShoesInBasket}</div>
              </div>
            </div>
          </div>
          <div className="body-basket">{this.listOfInventory()}</div>
        </div>
      </>
      
    )
  }
}

export default BasketPage;