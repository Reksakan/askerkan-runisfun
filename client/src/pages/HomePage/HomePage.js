import React from 'react';
// import axios from 'axios';
import Header from './components/Header/Header';
import Filter from './components/Filter/Filter';

class HomePage extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Filter />
      </>
    )
  }
}

export default HomePage;