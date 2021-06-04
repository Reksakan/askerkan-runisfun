import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import ProductPage from './pages/ProductPage/ProductPage';
import BasketPage from './pages/BasketPage/BasketPage';
import Header from './pages/HomePage/components/Header/Header';
import Footer from './pages/HomePage/components/Footer/Footer';
// import { withRouter } from "react-router-dom"; 


class App extends React.Component {
  render() {
  
    return (
      <BrowserRouter>
        <div className="homepage">
          <Header />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/home" component={HomePage} />
            <Route path="/product" component={ProductPage} />
            <Route path="/basket" component={BasketPage} />
          </Switch>
          <Footer />
        </div>
        
      </BrowserRouter>
    );
  } 
}

//withRouter - програмное управление маршрутизатором (URL).   DO NOT FORGET TO CLEAN IT UP


export default App;
