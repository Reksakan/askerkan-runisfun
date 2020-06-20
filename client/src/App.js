import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import { withRouter } from "react-router-dom";


class App extends React.Component {
  render() {
  
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/shoes/men" exact component={HomePage} />
          <Route path="/shoes/women" exact component={HomePage} />
          <Route path="/shoes/kids" exact component={HomePage} />
  
        </Switch>
      </BrowserRouter>
    );
  } 
}

//withRouter - програмное управление маршрутизатором (URL).   DO NOT FORGET TO CLEAN IT UP


export default App;
