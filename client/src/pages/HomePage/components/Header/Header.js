import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Form, FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.scss';
import logo from '../../../../assets/Icons/logo/logo-new1.png';
import basket from '../../../../assets/Icons/other/basket.svg';
import sign from '../../../../assets/Icons/other/sign-in.png';


class Header extends React.Component {
  render() {
    return (
      <section className="header">
        <Navbar className="color-set" >
          <Navbar.Brand href="/"><img className="header__logo" src={logo} alt="logo"/></Navbar.Brand>
            {/* <Nav className="mr-put">
              <Nav.Link href="/men"><div className="color-text">Men</div></Nav.Link>
              <Nav.Link href="/women"><div className="color-text">Women</div></Nav.Link>
              <Nav.Link href="/kids"><div className="color-text">Kids</div></Nav.Link>
            </Nav>          */}
          <div className="header__right">
            <Navbar.Brand href="/basket">
              <img className="header__basket" src={basket} alt="basket"/>
            </Navbar.Brand>
            <img className="header__sign-in" src={sign} alt="sign-in"/>
          </div>
        </Navbar>
      </section>
    )
  }
}

export default Header;