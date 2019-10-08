import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container
} from 'reactstrap';
import { Link } from 'react-router-dom';

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color='dark' dark expand='md'>
          <Container>
            <Link className='text-white' style={{ fontSize: '1.5rem' }} to='/'>
              <span role='img' aria-label='truck'>
                🚚{' '}
              </span>
              Storefront
            </Link>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                <NavItem>
                  <Link onClick={this.toggle} className='nav-link' to='/about'>
                    About Us
                  </Link>
                </NavItem>
                <NavItem>
                  <NavLink
                    onClick={this.toggle}
                    href='https://github.com/reactstrap/reactstrap'
                  >
                    GitHub
                  </NavLink>
                </NavItem>
                <NavItem>
                  <Link
                    onClick={this.toggle}
                    className='nav-link'
                    to='/dashboard/'
                  >
                    Dashboard
                  </Link>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Options
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Option 1</DropdownItem>
                    <DropdownItem>Option 2</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Reset</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
