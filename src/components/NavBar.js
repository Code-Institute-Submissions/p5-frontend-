import React from 'react'
import {Container, Nav, Navbar, Form, Button } from 'react-bootstrap';
import styles from '../styles/NavBar.module.css';
import {NavLink} from 'react-router-dom';


const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="sm" fixed="top">
      <Container>
        <NavLink to='/'>
          <Navbar.Brand className={styles.Logo}>Whatodogotodo</Navbar.Brand>
        </NavLink>
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
                <Button variant="light"><i className="fa-solid fa-magnifying-glass"></i></Button>
            </Form>
            <NavLink to='/signin' className={styles.NavLink} activeclassname={styles.Active}>Sign In</NavLink>
            <NavLink to='/register' className={styles.NavLink} activeclassname={styles.Active}>Register</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar