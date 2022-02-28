import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
  return (
    <header>
      <Navbar bg='light' varient='light' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Companies</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Container className='ml-auto'>
            <Navbar.Collapse className='justify-content-end'>
              <Nav className='ml-auto'>
                <LinkContainer to='/persons'>
                  <Nav.Link>
                    <i className='fas fa-users'></i>Persons
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
