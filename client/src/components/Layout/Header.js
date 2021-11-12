import React from "react"
import { useQuery, gql } from "@apollo/client"
import { Link } from "react-router-dom"
import authDispatch from "../../state/auth"
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
 import { Link as ScrollLink } from "react-scroll"
 import logo from "../../images/logo.png"

 const GET_USER_AUTH_STATE = gql`
    query {
      Auth @client
    }
 `

const Header = () => {

      const { data } = useQuery(GET_USER_AUTH_STATE)

      const handleLogout = () => {
        authDispatch({
          type:"USER_LOGOUT"
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
                    <ScrollLink activeClass="active" to="about" spy={true} smooth={true} duration={1000} className="nav-link">
                    About Us
                  </ScrollLink>
                  </NavItem>
                  <NavItem>
                    <ScrollLink activeClass="active" to="category" spy={true} smooth={true} duration={1000} className="nav-link">
                    Category
                  </ScrollLink>
                  </NavItem>
                  <NavItem>
                  <ScrollLink activeClass="active" to="services" spy={true} smooth={true} duration={1000} className="nav-link">
                    Services
                  </ScrollLink>
                  </NavItem>
                  <NavItem>
                  <ScrollLink activeClass="active" to="contact" spy={true} smooth={true} duration={1000} className="nav-link">
                    Contact Us
                  </ScrollLink>
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
                          data.Auth.user.role === 'admin' ? (<>
                             <NavItem className="d-lg-block ml-lg-2 mb-1">
                              <Button 
                              onClick={handleLogout}
                              outline color="primary" type="button">
                               <span className="nav-link-inner--text ml-1">
                                  Logout
                                </span>
                              </Button>
                            </NavItem>
                            <br />
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
                          </>) : (
                            <>
                             <NavItem className="d-lg-block ml-lg-2 mb-1">
                              <Button 
                              onClick={handleLogout}
                              outline color="primary" type="button">
                               <span className="nav-link-inner--text ml-1">
                                  Logout
                                </span>
                              </Button>
                            </NavItem>
                            <br />
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
                          </>
                          )
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

export default Header


// <Navbar className="navbar-dark bg-primary navbar-styles" expand="lg">
// <Container>
//   <NavbarBrand tag={Link} to="/">
//     EVERYTINDISCOUNT
//   </NavbarBrand>
//   <button className="navbar-toggler" id="navbar-primary">
//     <span className="navbar-toggler-icon" />
//   </button>
//   <UncontrolledCollapse navbar toggler="#navbar-primary">
//     <div className="navbar-collapse-header">
//       <Row>
//         <Col className="collapse-brand" xs="6">
//           <Link to="/">
//             EVERYTINDISCOUNT
//           </Link>
//         </Col>
//         <Col className="collapse-close" xs="6">
//           <button className="navbar-toggler" id="navbar-primary">
//             <span />
//             <span />
//           </button>
//         </Col>
//       </Row>
//     </div>
//     <Nav className="ml-small" navbar>
//       <NavItem>
//         <NavLink tag={Link} to="/about">
//           About Us
//         </NavLink>
//       </NavItem>
//       <NavItem>
//         <NavLink tag={Link} to="/services">
//           Services
//         </NavLink>
//       </NavItem>
//       <NavItem>
//         <NavLink tag={Link} to="/contact">
//          Contact Us
//         </NavLink>
//       </NavItem>
//     </Nav>
//     <Nav className="align-items-lg-center ml-lg-auto" navbar>
//     <NavItem>
//    <NavLink
//           className="nav-link-icon"
//           href="https://www.facebook.com/creativetim"
//           id="tooltip333589074"
//           target="_blank"
//         >
//           <i className="fa fa-facebook-square" />
//           <span className="nav-link-inner--text d-lg-none ml-2">
//             Facebook
//           </span>
//         </NavLink>
//         <UncontrolledTooltip delay={0} target="tooltip333589074">
//           Like us on Facebook
//         </UncontrolledTooltip>
//       </NavItem>
//       <NavItem>
//         <NavLink
//           className="nav-link-icon"
//           href="https://www.instagram.com/creativetimofficial"
//           id="tooltip356693867"
//           target="_blank"
//         >
//           <i className="fa fa-instagram" />
//           <span className="nav-link-inner--text d-lg-none ml-2">
//             Instagram
//           </span>
//         </NavLink>
//         <UncontrolledTooltip delay={0} target="tooltip356693867">
//           Follow us on Instagram
//         </UncontrolledTooltip>
//       </NavItem>
//       <NavItem>
//         <NavLink
//           className="nav-link-icon"
//           href="https://twitter.com/creativetim"
//           id="tooltip184698705"
//           target="_blank"
//         >
//           <i className="fa fa-twitter-square" />
//           <span className="nav-link-inner--text d-lg-none ml-2">
//             Twitter
//           </span>
//         </NavLink>
//         <UncontrolledTooltip delay={0} target="tooltip184698705">
//           Follow us on Twitter
//         </UncontrolledTooltip>
//       </NavItem>
//       <NavItem className="d-lg-block ml-lg-4">
//         <Button
//           className="btn-neutral btn-icon"
//           color="default"
//           tag={Link}
//           to="/login"
//         >
//           <span className="btn-inner--icon">
//           <i className="ni ni-single-02"></i>
//           </span>
//           <span className="nav-link-inner--text ml-1">
//             Login
//           </span>
//         </Button>
//       </NavItem>
//     </Nav>

//   </UncontrolledCollapse>
// </Container>
// </Navbar>