import React from 'react';
import './ProductCard.scss';

class ProductCard extends React.Component {
  render() {
    return (
      <div className="product" key={this.props.key} id={this.props.id}>
          <img className="product__img" src={this.props.picture} alt="shoe" />
        <div className="product__details">
          <p className="product__text bold">{this.props.price}</p>
          <p className="product__text">{this.props.name}</p>
          <p className="product__text">{this.props.gender}</p>
          <p className="product__text">{this.props.producer}</p>
          <p>{this.props.description}</p>
        </div>
      </div>
    )
  }
}

export default ProductCard;