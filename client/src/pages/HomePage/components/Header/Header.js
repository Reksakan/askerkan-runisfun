import React from 'react';
import './Header.scss';
import logo from '../../../../assets/Images/logo-new1.png';
import { Nav, Navbar } from 'react-bootstrap';
import { Form, FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Header extends React.Component {
  render() {
    return (
      <>
        <Navbar className="color-set" >
        <Navbar.Brand href="/"><img className="header__logo" src={logo} alt="logo"/></Navbar.Brand>
          <Nav className="mr-put">
            <Nav.Link href="/shoes/men"><div className="color-text">Men</div></Nav.Link>
            <Nav.Link href="/shoes/women"><div className="color-text">Women</div></Nav.Link>
            <Nav.Link href="/shoes/kids"><div className="color-text">Kids</div></Nav.Link>
          </Nav>
          <Form className="search">
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-primary">Search</Button>
          </Form>
        </Navbar>
      </>
    )
  }
}

export default Header;