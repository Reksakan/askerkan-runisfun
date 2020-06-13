import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';

function App() {
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

export default App;
