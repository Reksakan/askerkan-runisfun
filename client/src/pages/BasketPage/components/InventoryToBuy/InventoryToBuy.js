import React from 'react';
import './InventoryToBuy.scss';

class InventoryToBuy extends React.Component {
  render() {
    return (
      <div className="inven" key={this.props.idUnique} id={this.props.id}>
        <div>
          <img className="inven__img" src={this.props.picture} alt="shoe" />
        </div>
        <div className="inven__details">
          <p>{this.props.name}</p>
          <p>{this.props.producer}</p>
          <p>{this.props.description}</p>
          <p>{this.props.price}</p>
        </div>
        <div className="inven__button">
          <button className="inven__del" type="button" key={this.props.key} onClick={()=> this.props.onClick(this.props.idUnique)}></button>
          <br></br>
        </div>
      </div>
    )
  }
}

export default InventoryToBuy;