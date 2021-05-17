import React from 'react';
import './ShoeVariants.scss';



class ShoeVariants extends React.Component {

  render() {
    return (
      <div className="sample"   
        style={{
          background: this.props.item.colour,
          color: this.props.item.colour === "black" ? "white" : (this.props.item.colour === "blue" ? "white" : "black")  //ternary operator
        }}>
          <span className="sample__span"
          >{this.props.item.size} {this.props.gender}
        </span>
      </div>
      
    )
  }
}

export default ShoeVariants;