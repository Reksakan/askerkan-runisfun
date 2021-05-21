import React from 'react';
import './InventoryToBuy.scss';

class InventoryToBuy extends React.Component {
  render() {
    return (
      <div className="inven" key={this.props.idUnique} id={this.props.id}>
        <img className="inven__img" src={this.props.picture} alt="shoe" />
        <div className="inven__details">
          <p>
            <span>{this.props.producer}</span>
            <span> / </span>
            <span>{this.props.name}</span>
          </p>
          <p>
            <span>Colour: {this.props.colour}</span>
            <span> / </span>
            <span>Size: {this.props.size}</span>
          </p>
          <p className="inven__bold">{this.props.price}</p>
          <p className="inven__details-text">{this.props.description}</p>
          <p>Available quantity: {this.props.quantity}</p>
        </div>
        <div className="inven__button">
          <button className="inven__del" type="button" onClick={()=> this.props.onClick(this.props.idUnique)}></button>
          <br></br>
        </div>
      </div>
    )
  }
}

export default InventoryToBuy;