import React from 'react'
import {Container, Nav, Navbar, Dropdown , Form, Button } from 'react-bootstrap';
import Avatar from './Avatar';
import styles from '../styles/NavBar.module.css';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import { useCurrentUser, useSetCurrentUser} from '../contexts/CurrentUserContext';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';


const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const {expanded, setExpanded, ref} = useClickOutsideToggle();

  const handleSignOut = async () =>{
    try{
      await axios.post('dj-rest-auth/logout/');
      setCurrentUser(null);
    }catch(error){
      console.log(error)
    }
  }

  const loggedInNavLinks = (
    <>
      <Dropdown className="mx-2 d-none d-sm-inline">
        <Dropdown.Toggle variant='light' id="dropdown-autoclose-true">
        {currentUser?.username}
        <Avatar src={currentUser?.profile_image}/>
        </Dropdown.Toggle>
        
        <Dropdown.Menu>
        <div>
          <NavLink className={styles.NavLink} to={`/profiles/${currentUser?.profile_id}`}>
          Profile
          </NavLink>
        </div>
        <div>
          <NavLink>
          Account
          </NavLink>
        </div>
        <div>
          <NavLink className={styles.NavLink} to='/' onClick={handleSignOut}>
          Sign out
          </NavLink>
        </div>
        </Dropdown.Menu>
      </Dropdown>
      <div className='d-sm-none'>
        <div>
          <NavLink className={styles.NavLink} to={`/profiles/${currentUser?.profile_id}`}>
          Profile
          </NavLink>
        </div>
        <div>
          <NavLink>
          Account
          </NavLink>
        </div>
        <div>
          <NavLink className={styles.NavLink} to='/' onClick={handleSignOut}>
          Sign out
          </NavLink>
        </div>
      </div>
    </>
  )
  const loggedOutNavLinks = (
  <>
    <NavLink to='/signin' className={styles.NavLink} activeclassname={styles.Active}>Sign In</NavLink>
    <NavLink to='/register' className={styles.NavLink} activeclassname={styles.Active}>Register</NavLink>
  </>
  );
  

  return (
    <Navbar expanded={expanded} className={styles.NavBar} expand="sm" fixed="top">
      <Container>
        <NavLink to='/'>
          <Navbar.Brand className={styles.Logo}>Whatodogotodo</Navbar.Brand>
        </NavLink>
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
          ref={ref}
        />
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
            {currentUser? loggedInNavLinks : loggedOutNavLinks}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar