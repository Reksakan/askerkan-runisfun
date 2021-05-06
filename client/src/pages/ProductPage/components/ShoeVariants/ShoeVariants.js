import React from 'react';
import './ShoeVariants.scss';



class ShoeVariants extends React.Component {

  render() {
    return (
      <div 
      className="sample" 
      style={{
        background: this.props.item.colour,
        color: this.props.item.colour == "black" ? "white" : "black"
      }}
      >{this.props.item.size} {this.props.gender}
      </div>
    )
  }
}

export default ShoeVariants;