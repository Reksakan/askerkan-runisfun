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
      gender={shoe.gender}
      producer={shoe.producer}
      description={shoe.description}
      price={shoe.price}
      picture={shoe.picture} />
    })
    return shoeSelected;
  }

  componentDidMount () {
    const urlProduct = qs.parse(this.props.location.search, { comma: true, ignoreQueryPrefix: true });
    this.fetchShoe(urlProduct);
  }
  
  render () {
    return (
      <div className="productPage">
        <div>{this.shoeCard()}</div>
        {/* <div className="productPage__sort">LEFT SIDE FILTER</div> */}
        <img className="productPage__sort" src="/pictures/sports-equipment_38359-143.jpg" alt="sports"></img>
        <ProductFilter />
      </div>
    )
  }
}

export default ProductPage;