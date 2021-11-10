import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
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

const VerticalNavbar = () => {

    const { data : activeLink } = useQuery(GET_DASHBOARD_ACTIVE_LINK)
    const [ collapseOpen, setCollapseOpen ] = useState(false)
    const toggleCollapse = () => setCollapseOpen(!collapseOpen)

    const updateLinkOnClick = (linkNumber) => {
        updateActiveLink({
            type:"UPDATE_ACTIVE_LINK",
            payload: linkNumber
        })
    }

    return <>
         <Navbar
        className="navbar-vertical fixed-left navbar-light bg-white"
        expand="md"
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
        <NavbarBrand className="pt-0">
            <img
            alt="..."
            className="navbar-brand-img"
            src={logo}
            />
        </NavbarBrand>
          {/* Collapse */}
          <Collapse navbar isOpen={collapseOpen}>
            {/* Collapse header */}
            <div className="navbar-collapse-header d-md-none">
              <Row>
                  <Col className="collapse-brand" xs="6">
                      <Link to="/admin">
                        <img alt="..." src={logo} />
                      </Link>
                  </Col>
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleCollapse}
                  >
                    <span />
                    <span />
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
                    to="/admin"
                    tag={Link}
                >
                <i className="fas fa-tv"></i>
                    Dashboard
                </NavLink>
            </NavItem>
             <NavItem
             onClick={e => updateLinkOnClick(2)}
             className={activeLink.adminNavbarActiveLink === 2 && 'active-navbar-item'}>
                <NavLink
                    to="/admin/administrators"
                    tag={Link}
                >
                <i className="fas fa-user"></i>
                    Admins
                </NavLink>
            </NavItem>
             <NavItem 
             onClick={e => updateLinkOnClick(3)}
             className={activeLink.adminNavbarActiveLink === 3 && 'active-navbar-item'}>
            <NavLink
                to="/admin/marketers"
                tag={Link}
            >
            <i className="fas fa-users"></i>
               Marketers
            </NavLink>
            </NavItem>  
            <NavItem
            onClick={e => updateLinkOnClick(4)}
            className={activeLink.adminNavbarActiveLink === 4 && 'active-navbar-item'}>
            <NavLink
                to="/admin/transaction"
                tag={Link}
            >
            <i className="fas fa-chart-line"></i>
                Transactions
            </NavLink>
            </NavItem>  
            <NavItem
            onClick={e => updateLinkOnClick(5)}
            className={activeLink.adminNavbarActiveLink === 5 && 'active-navbar-item'}>
            <NavLink
                to="/admin/packagetypes"
                tag={Link}
            >
            <i className="fas fa-layer-group"></i>
                Package Types
            </NavLink>
            </NavItem> 
            <NavItem 
            onClick={e => updateLinkOnClick(6)}
            className={activeLink.adminNavbarActiveLink === 6 && 'active-navbar-item'}>
            <NavLink
                to="/admin/packages"
                tag={Link}
            >
            <i className="fas fa-cubes"></i>
                Packages
            </NavLink>
            </NavItem> 
            <NavItem
            onClick={e => updateLinkOnClick(7)}
            className={activeLink.adminNavbarActiveLink === 7 && 'active-navbar-item'}>
            <NavLink
                to="/admin/profile"
                tag={Link}
            >
            <i className="fas fa-id-card"></i>
                Profile
            </NavLink>
            </NavItem>  
            <NavItem
            onClick={e => updateLinkOnClick(8)}
            className={activeLink.adminNavbarActiveLink === 8 && 'active-navbar-item'}>
            <NavLink
                to="/admin/users"
                tag={Link}
            >
            <i className="fas fa-users"></i>
                Users
            </NavLink>
            </NavItem>  
            </Nav>
            {/* Divider */}
            <hr className="my-3" />
            {/* Heading */}
            <Nav className="mb-md-3" navbar>
              <NavItem className="active-pro active">
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

export default VerticalNavbar
