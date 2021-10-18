import React from 'react'
import { Link } from "react-router-dom"
import {
  Button,
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
 } from "reactstrap"

import logo from "../../images/logo.png"

export const PagesNavbar = () => {
   return (
        <>
          <Navbar className="navbar-dark" expand="lg">
            <Container>
              <NavbarBrand tag={Link} to="/">
                <img src={logo} className="img-fluid" alt="everytindiscount logo" />
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar-primary">
              <i className="fas fa-bars toggler-style"></i>
              </button>
              <UncontrolledCollapse navbar toggler="#navbar-primary">
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link to="/">
                      <img src={logo} className="img-fluid" alt="everytindiscount logo" />
                      </Link>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar-primary">
                      <i className="fas fa-bars toggler-style"></i>
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="ml-small align-items-lg-center ml-lg-auto" navbar>
                  <NavItem>
                    <Link to="/">
                        Home
                    </Link>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/login">
                     Log in
                    </NavLink>
                  </NavItem>
                  <NavItem className="d-lg-block ml-lg-4">
                    <Button
                         className="btn-neutral btn-icon navbar-btn"
                         color="default"
                         tag={Link}
                         to="/signup"
                           >
                         <span className="btn-inner--icon">
                         <i className="ni ni-single-02"></i>
                         </span>
                         <span className="nav-link-inner--text ml-1">
                          Get Started
                         </span>
                       </Button>
                    </NavItem>
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </>
      )
}

export default PagesNavbar
