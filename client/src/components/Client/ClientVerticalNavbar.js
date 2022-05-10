import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import authDispatch from '../../state/auth'
import {
    Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from 'reactstrap'

import logo from "../../images/logo.png"
import updateActiveLink from '../../state/activeLinkInAdminDashboard'

const GET_DASHBOARD_ACTIVE_LINK = gql`
    query {
        adminNavbarActiveLink @client
    }
`

const ClientVerticalNavbar = () => {

    const { data : activeLink } = useQuery(GET_DASHBOARD_ACTIVE_LINK)
    const [ collapseOpen, setCollapseOpen ] = useState(false)
    const toggleCollapse = () => setCollapseOpen(!collapseOpen)

    const updateLinkOnClick = (linkNumber) => {
        updateActiveLink({
            type:"UPDATE_ACTIVE_LINK",
            payload: linkNumber
        })
    }

    const handleLogout = () => {
        authDispatch({
          type:"USER_LOGOUT"
        })
    }

    return <>
         <Navbar
        className="navbar-vertical fixed-left navbar-light bg-white"
        expand="lg"
        id="sidenav-main"
      >
        <Container fluid>
          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleCollapse}
           >
            <span className="navbar-toggler-icon" />
            
          </button>
        <NavbarBrand tag={Link} to="/" className="pt-0">
            <img
            alt="..."
            className="navbar-brand-img"
            src={logo}
            />
        </NavbarBrand>
          {/* Collapse */}
          <Collapse navbar isOpen={collapseOpen}>
            {/* Collapse header */}
            <div className="navbar-collapse-header">
              <Row>
                  <Col className="collapse-brand" xs="6">
                      <Link to="/">
                        <img alt="..." src={logo} />
                      </Link>
                  </Col>
                <Col className="collapse-close" xs="6">
                <button
                  style={{
                    border:'1px solid transparent',
                    background:'transparent'
                  }}
                  type="button"
                  onClick={toggleCollapse}
                >
                  <i className="fas fa-times toggler-style"></i>
                </button>
                </Col>
              </Row>
            </div>
            {/* Navigation */}
            <Nav navbar>
            <NavItem 
             onClick={e => updateLinkOnClick(1)}
             className={activeLink.adminNavbarActiveLink === 1 && 'active-navbar-item'}>
                <NavLink
                    to="/user/package"
                    tag={Link}
                >
                <i className="fas fa-tv"></i>
                    Packages
                </NavLink>
            </NavItem>
             <NavItem
             onClick={e => updateLinkOnClick(2)}
             className={activeLink.adminNavbarActiveLink === 2 && 'active-navbar-item'}>
                <NavLink
                    to="/user/transaction"
                    tag={Link}
                >
                <i className="fas fa-user"></i>
                    Transaction
                </NavLink>
            </NavItem>
            <NavItem 
             onClick={e => updateLinkOnClick(3)}
             className={activeLink.adminNavbarActiveLink === 3 && 'active-navbar-item'}>
            <NavLink
                to="/user/profile"
                tag={Link}
            >
            <i className="fas fa-id-card"></i>
               My profile
            </NavLink>
            </NavItem>      
            </Nav>
            {/* Divider */}
            <hr className="my-3" />
            {/* Heading */}
            <Nav className="mb-md-3" navbar>
              <NavItem onClick={handleLogout} className="active-pro active signout-button">
                <NavLink>
                <i className="fas fa-sign-out-alt"></i>
                    Logout
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
}

export default ClientVerticalNavbar
