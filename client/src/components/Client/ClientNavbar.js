import React from 'react'
import { useQuery, gql } from '@apollo/client';
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media
} from "reactstrap";
import dummyAvatar from "../../images/dummy-avatar.png"

const GET_USER_AUTH_STATE = gql`
    query {
      Auth @client
    }
`
const ClientNavbar = () => {

  const { data } = useQuery(GET_USER_AUTH_STATE)

  const { Auth: {
    user
  } } = data

    return <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/user/package"
            >
             EverytinDiscount
            </Link>
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={dummyAvatar}
                      />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span style={{color:"#fff"}} className="mb-0 text-sm font-weight-bold">
                        Client { user?.name }
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu style={{
                  zIndex: '1000'
                }} className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </DropdownItem>
                  <DropdownItem to="/user/profile" tag={Link}>
                    <i className="ni ni-single-02" />
                    <span>My profile</span>
                  </DropdownItem>
                  <DropdownItem to="/user/faq" tag={Link}>
                    <i className="ni ni-settings-gear-65" />
                    <span>Faq</span>
                  </DropdownItem>
                  <DropdownItem to="/user/support" tag={Link}>
                    <i className="ni ni-calendar-grid-58" />
                    <span>Contact Support</span>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
    </>
}

export default ClientNavbar
