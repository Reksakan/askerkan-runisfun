//Doesn't used. Should be deleted
import React from 'react';
import Card from '../Card/Card';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
class CardList extends React.Component {
  state = {
    shoes: [],
    shoesFiltered: []
  }

  fetchShoes() {
    axios
    .get(`${API_URL}/shoes`)
    .then(response => {
      this.setState({
        shoes: response.data
      })
    })
    .catch(error => {window.alert(error)})
  }

  componentDidMount() {
    this.fetchShoes();
  }

  render() {
    console.log ('this.state.shoes from state: ', this.state.shoes)
    return(
      <section>
        <ul>
          {/* {this.shoesList()} */}
        </ul>
      </section>
    )
  }
}

export default CardList;