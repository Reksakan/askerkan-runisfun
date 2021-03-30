import React from 'react';
import './ProductCard.scss';

class ProductCard extends React.Component {
  render() {
    return (
      <div className="product" key={this.props.key} id={this.props.id}>
        <div>
          <img className="product__img" src={this.props.picture} alt="shoe" />
        </div>
        <div className="product__details">
          <p>{this.props.name}</p>
          <p>{this.props.producer}</p>
          <p>{this.props.description}</p>
          <p>{this.props.price}</p>
        </div>
      </div>
    )
  }
}

export default ProductCard;