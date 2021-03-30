import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Card.scss';
import CardColour from '../CardColour/CardColour';
import ProductPage from '../../../ProductPage/ProductPage';


class Card extends React.Component {
  render() {
    return(
      <div className="card__container" key={this.props.key} id={this.props.id}>
        <div>
          <img className="card__img" src={this.props.picture} alt="shoe" />
        </div>
        <div className="card">
          <p className="card__text">{this.props.producer}<span> ({this.props.category})</span></p>
          <p className="card__text">{this.props.name}</p>
          <p className="card__text bold">{this.props.price}</p>
          <CardColour shoeVariances={this.props.shoeTypes}/>
          {/* <ProductPage shoeDescriptionId={this.props.id} /> */}
          {/* <button className="card__button" type="button" value={this.props.id} onClick={this.props.callAdd}>Add to Basket</button> */}
          <Link className="card__button-place" to={{pathname: `/product/`, search: `?id=${this.props.id}&name=${this.props.name}`}}>
            <button className="card__button" type="button" value={this.props.id}>Details</button>
          </Link>
          
        </div>
      </div>
    )
  }
}

export default Card;