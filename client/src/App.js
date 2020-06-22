import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import Header from './pages/HomePage/components/Header/Header';
import Footer from './pages/HomePage/components/Footer/Footer';
import { withRouter } from "react-router-dom";


class App extends React.Component {
  render() {
  
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
        </Switch>
        <Footer />
      </BrowserRouter>
    );
  } 
}

//withRouter - програмное управление маршрутизатором (URL).   DO NOT FORGET TO CLEAN IT UP


export default App;
