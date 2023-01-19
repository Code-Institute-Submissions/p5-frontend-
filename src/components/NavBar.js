import React from 'react'
import {Container, Nav, Navbar, Form, Button } from 'react-bootstrap';


const NavBar = () => {
  return (
    <Navbar bg="light" expand="sm" fixed="top">
      <Container>
        <Navbar.Brand>Whatodogotodo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-start">
            <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="light"><i class="fa-solid fa-magnifying-glass"></i></Button>
            </Form>
            <Nav.Link>Sign In</Nav.Link>
            <Nav.Link>Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar