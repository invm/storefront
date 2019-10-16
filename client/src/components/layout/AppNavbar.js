import React, { useContext, Fragment, useState } from 'react';
import AuthContext from '../../context/auth/authContext';
import StoreContext from '../../context/store/storeContext';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Container
} from 'reactstrap';
import { Link } from 'react-router-dom';

const AppNavbar = () => {
  const authContext = useContext(AuthContext);
  const storeContext = useContext(StoreContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const onLogoutClick = e => {
    logout();
    storeContext.clearStores();
  };

  const { isAuthenticated, logout, user } = authContext;

  const authLinks = (
    <Fragment>
      <NavItem>
        <a className='nav-link' onClick={onLogoutClick} href='#!'>
          Sign Out
        </a>
      </NavItem>
      <NavItem>
        <Link className='nav-link' to='/dashboard/'>
          {user ? `${user.company}'s ` : null}Dashboard
        </Link>
      </NavItem>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavItem>
        <Link className='nav-link' to='/about'>
          About Us
        </Link>
      </NavItem>
      <NavItem>
        <Link className='nav-link' to='/register/'>
          Register
        </Link>
      </NavItem>
      <NavItem>
        <Link className='nav-link' to='/login/'>
          Login
        </Link>
      </NavItem>
    </Fragment>
  );

  return (
    <Navbar color='dark' dark expand='md'>
      <Container>
        <Link className='text-white' style={{ fontSize: '1.5rem' }} to='/'>
          <span role='img' aria-label='truck'>
            🚚{' '}
          </span>
          Store<span className='text-primary'>front</span>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='ml-auto' navbar>
            {isAuthenticated ? authLinks : guestLinks}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
