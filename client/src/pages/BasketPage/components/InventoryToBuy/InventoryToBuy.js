import React from 'react';
import './InventoryToBuy.scss';

class InventoryToBuy extends React.Component {
  render() {
    return (
      <div className="inventory__box" key={this.props.key} id={this.props.id}>
        <div>
          <img className="inventory__img" src={this.props.picture} alt="shoe" />
        </div>
        <div className="inventory__details">
          <p>{this.props.name}</p>
          <p>{this.props.producer}</p>
          <p>{this.props.description}</p>
          <p>{this.props.price}</p>
        </div>
      </div>
    )
  }
}

export default InventoryToBuy;