import React from 'react';
import './Card.scss';
import CardColour from '../CardColour/CardColour';


class Card extends React.Component {
  render() {
    return(
      <div className="card__container" key={this.props.key} id={this.props.id}>
        <div>
          <img className="card__img" src={this.props.picture} alt="shoe" />
        </div>
        <div className="description">
          <p className="description__text">{this.props.producer}<span> ({this.props.category})</span></p>
          <p className="description__text">{this.props.name}</p>
          <p className="description__text bold">{this.props.price}</p>
          <CardColour shoeVariances={this.props.shoeTypes}/>
          <button className="description__button" type="button" value={this.props.id} onClick={this.props.callAdd}>Add to Basket</button>
        </div>
      </div>
    )
  }
}

export default Card;