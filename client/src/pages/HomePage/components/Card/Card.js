import React from 'react';
import './Card.scss';


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
          <button className="description__button" type="button" value="button" onClick={this.addShoe}>Add to Basket</button>
        </div>
      </div>
    )
  }
}

export default Card;