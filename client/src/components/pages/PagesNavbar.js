import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Link } from "react-router-dom"
import authDispatch from '../../state/auth'
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
import { USER_LOGOUT } from '../../action/types'


 const GET_USER_AUTH_STATE = gql`
 query {
   Auth @client
 }
`
 const PagesNavbar = () => {

  const { data } = useQuery(GET_USER_AUTH_STATE)

  const handleLogout = () => {
    authDispatch({
      type: USER_LOGOUT
    })
  }

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
                  {  
                      data.Auth.isAuthenticated === false && data.Auth.user === null ? 
                      <>
                       <NavItem>
                        <NavLink tag={Link} to="/login">
                          Log in
                        </NavLink>
                        </NavItem>
                        <NavItem className="d-lg-block ml-lg-2">
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
                      </> : <>
                        {
                          data?.Auth?.user?.role === 'admin' ? (<>
                          <NavItem className="d-lg-block ml-lg-2 mb-1">
                              <Button 
                              onClick={handleLogout}
                              outline color="primary" type="button">
                               <span className="nav-link-inner--text ml-1">
                                  Logout
                                </span>
                              </Button>
                            </NavItem>
          
                            <NavItem className="d-lg-block ml-lg-2">
                            <Button
                              className="btn-neutral btn-icon navbar-btn"
                              color="default"
                              tag={Link}
                              to="/admin"
                                >
                              <span className="btn-inner--icon">
                              <i className="ni ni-single-02"></i>
                              </span>
                              <span className="nav-link-inner--text ml-2">
                               Go To Admin Dashboard
                              </span>
                            </Button>
                        </NavItem>
                          </>) : (<>
                            <NavItem className="d-lg-block ml-lg-2 mb-1">
                              <Button 
                              onClick={handleLogout}
                              outline color="primary" type="button">
                               <span className="nav-link-inner--text ml-1">
                                  Logout
                                </span>
                              </Button>
                            </NavItem>
                            <NavItem className="d-lg-block ml-lg-2">
                            <Button
                              className="btn-neutral btn-icon navbar-btn"
                              color="default"
                              tag={Link}
                              to="/user/dashboard"
                                >
                              <span className="btn-inner--icon">
                              <i className="ni ni-single-02"></i>
                              </span>
                              <span className="nav-link-inner--text ml-1">
                               Go To Dashboard
                              </span>
                            </Button>
                         </NavItem>
                         </>)
                        }
                      </>
                    }
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </>
      )
}

export default PagesNavbar
