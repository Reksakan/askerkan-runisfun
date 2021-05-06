import React from 'react';
import qs from 'qs';
import axios from 'axios';
import './ProductPage.scss';
import ProductCard from './components/ProductCard';
import ProductFilter from './components/ProductFilter';

const API_URL = process.env.REACT_APP_API_URL;

class ProductPage extends React.Component {
  state = {
    shoeChosen: []
  };

  fetchShoe(urlProduct) {
    const shoeID = urlProduct.id;
    axios
    .get(`${API_URL}/${shoeID}`)
    .then(response => {
      const shoeChosen =  response.data;
      this.setState({
        shoeChosen: shoeChosen
      })
    })
    .catch(error => {window.alert(error)}); 
  }

  shoeCard() {
    const shoeSelected = this.state.shoeChosen.map(shoe => {
      return <ProductCard
      id={shoe.id}
      key={shoe.id}
      name={shoe.name}
      producer={shoe.producer}
      description={shoe.description}
      price={shoe.price}
      picture={shoe.picture} />
    })
    return shoeSelected;
  }

  componentDidMount () {
    const urlProduct = qs.parse(this.props.location.search, { comma: true, ignoreQueryPrefix: true });
    console.log('urlProduct: ', urlProduct);                                                               //DELETE
    this.fetchShoe(urlProduct);
  }
  
  
  render () {
    return (
      <div className="body">
        <div>
          <div>{this.shoeCard()}</div>
        </div>
        <ProductFilter />
      </div>
    )
  }
}

export default ProductPage;