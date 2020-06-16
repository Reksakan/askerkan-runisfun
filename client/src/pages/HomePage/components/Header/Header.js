import React from 'react';
import './Header.scss';
import logo from '../../../../assets/Images/logo_transparent.png';
import { Nav, Navbar } from 'react-bootstrap';
import { Form, FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Header extends React.Component {
  render() {
    return (
      <>
        <Navbar bg="light" variant="light">
        <Navbar.Brand href="/"><img className="header__logo" src={logo} alt="logo"/></Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/shoes/men">Men</Nav.Link>
            <Nav.Link href="/shoes/women">Women</Nav.Link>
            <Nav.Link href="/shoes/kids">Kids</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-primary">Search</Button>
          </Form>
        </Navbar>
      </>
    )
  }
}

export default Header;