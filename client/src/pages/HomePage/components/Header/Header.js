import React from 'react';
import { Link, NavLink } from 'react-router-dom'; 
import './Header.scss';
import logo from '../../../../assets/images/logo.png';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <Link to="/">
          <img className="header__logo" alt="logo" scr={logo} />
        </Link>
        <nav>
          <NavLink to="/shoes/men" activeClassName="header__active">
            <p className="header__sections">Men</p>
          </NavLink>
          <NavLink to="/shoes/women" activeClassName="header__active">
            <p className="header__sections">Women</p>
          </NavLink>
          <NavLink to="/shoes/kids" activeClassName="header__active">
            <p className="header__sections">Kids</p>
          </NavLink>
        </nav>
        <form className="header__search">
          <input className="header__search-input" type="text" name="searh" placeholder="Search"/>
        </form>
      </div>
    )
  }
}

export default Header;