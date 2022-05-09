import React, { useState } from "react"
import { withRouter } from 'react-router-dom'
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { useAlert } from 'react-alert';
import authDispatch from '../../state/auth'
import { USER_LOGIN } from "../../action/types";

import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col
  } from "reactstrap";
  import logo from "../../images/logo.png"

  const SIGN_IN = gql`
  mutation($signinData: signInInput!) {
    signin(data: $signinData) {
      token
      user {
        id
        email
        role
        id
        name
      }
    }
  }
  `

const Login = ({ history }) => {

  const [ signinData, setSigninData ] = useState({
    email: '',
    password:''
  })

  const alert = useAlert()

  const [ signin, { loading } ] = useMutation(SIGN_IN, {
    variables: {
      signinData: {
        email: signinData.email,
        password: signinData.password
      }
    },
    onCompleted: ({ signin }) => {
      alert.show('sign in was successful', {
        type:'success'
      })
      localStorage.setItem('token', signin.token)
      authDispatch({
        type: USER_LOGIN,
        payload: {
          token: signin.token,
          user: signin.user,
          isAuthenticated: true
        }
      })
      history.push('/', 'category')
    },
    onError: (error) => {
      alert.show(error.message, {
        type:'error'
      })
    }
  })

  const updateSignInDetails = (e) => setSigninData({
    ...signinData,
    [e.target.name]: e.target.value
  })

  const handleFormSubmit = (e) => {
    e.preventDefault()
    signin()
  }

return <>
<section className="login section section-shaped full-width">
 <div className="shape shape-style-1 section-background">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
    </div>
            <Container className="pt-lg-4">
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5">
                      <div className="site-logo-container">
                        <img src={logo} className="img-fluid" alt="everytindiscount logo" />
                      </div>
                      <div className="text-center text-muted mt-3 mb-3">
                        <small>Login with your credentials</small>
                      </div>
                      <Form role="form" onSubmit={e => handleFormSubmit(e)}>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                             placeholder="Email" 
                             type="email"
                             name="email"
                             autoComplete="off"
                             required
                             value={signinData.email}
                             onChange={e => updateSignInDetails(e)}
                             />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Password"
                              type="password"
                              autoComplete="off"
                              name="password"
                              required
                              value={signinData.password}
                              onChange={e => updateSignInDetails(e)}
                            />
                          </InputGroup>
                        </FormGroup>
                      <div className="text-muted mt-1 mb-1">
                        <small>Forgot your passord? <Link to="/reset/password">Click Here</Link></small>
                      </div>
                        <div className="text-center">
                          <Button
                            className="mt-4 btn-login"
                            color="primary"
                            type="submit"
                            disabled={loading}
                          >
                            {
                                   loading ? <>
                                   <span className="btn-inner--icon">
                                   <i className="fas fa-circle-notch fa-spin"></i>
                                   </span>
                                   <span className="nav-link-inner--text ml-1">
                                       Loading
                                   </span>
                                    </> : <>
                                        Login
                                    </>
                               }
                          </Button>
                        </div>
                      </Form>
                      <Row className="mt-4"> 
                        <Col>
                            <p className="small-text text-center">Go back to <Link to="/">
                            home page
                              </Link></p>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                  <Card className="mt-3">
                    <CardBody className="card-body-sm-pb">
                    <Row>
                    <Col sm="7"> 
                    <p className="small-text">Don't have an account yet?</p>
                    </Col>
                    <Col sm="5">
                    <Link className="signin-cta mb-2" to="/signup">Sign up</Link>
                    </Col>
                    </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
    </>
}

export default withRouter(Login)