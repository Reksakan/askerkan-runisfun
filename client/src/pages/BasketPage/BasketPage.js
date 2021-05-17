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
    let shoeModels = this.state.shoesInBasket.map(shoe => { return shoe.idShoe})
    console.log('shoeModels: ', shoeModels);
    let shoeVariances = this.state.shoesInBasket.map(shoe => {return shoe.idInt})
    console.log('shoeVariances: ', shoeVariances);
    
    let shoesStockUpdate = this.state.shoesInitial.map(shoe => {
      if (shoeModels.includes(shoe.id)) {
        shoe.types.map(item => {
          if(shoeVariances.includes(item.idInt)) {
            item.quantity = item.quantity - 1
          } return item;
        }) 
      } return shoe
    })
    return console.log('shoesStockUpdate: ', shoesStockUpdate)
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
      picture={item.picture}
      onClick={this.deleteShoe}/>
    })
    return inventoryList;
  }

  render() {
    return (
      <>
        <div className="body-all">
          <div className="body-basket">{this.listOfInventory()}</div>
          <div className="body-buy">
            <div>
              <button className="body-button" type="button" value="submit" onClick={this.buyShoes}>BUY</button>
            </div>
            <div className="body-buy__sum">
              <h1>ORDER SUMMARY</h1>
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
        </div>
      </>
      
    )
  }
}

export default BasketPage;