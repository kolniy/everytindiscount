import React, { useState } from "react"
import authDispatch from "../../state/auth";
import { withRouter } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { gql, useMutation } from "@apollo/client";
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
  import { Link } from "react-router-dom"
  import logo from "../../images/logo.png"

const SIGN_UP = gql`
  mutation ($signupData: signUpInput!) {
  signup(data: $signupData) {
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

const Register = ({ history }) => {

  const [ signupData, setSignupData ] = useState({
    name:'',
    email:'',
    password:'',
    password2:'',
  })
  
  const alert = useAlert()
  const [ signup, { loading } ] = useMutation(SIGN_UP, {
    variables: {
      signupData: {
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
        isAdmin: false
      }
    },
    onCompleted: ({ signup }) => {
      console.log(signup.user, 'registration data')
      alert.show('sign up completed successfully', {
        type:'success'
      })
      localStorage.setItem('token', signup.token)
      authDispatch({
        type: "USER_SIGNUP",
        payload: {
          token: signup.token,
          user: signup.user,
          isAuthenticated: true
        }
      })
      history.push('/', 'category')
    },
    onError: (error) => {
      console.log(error)
      alert.show(error.message, {
        type:'error'
      })
    }
  })

  const updateSignupForm = (e) => setSignupData({
    ...signupData,
    [e.target.name]: e.target.value
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if(signupData.password !== signupData.password2){
      return alert.show('invalid confirm password', {
        type:'error'
      })
    }
  
    signup()
  }

return <>
<section className="register section section-shaped full-width">
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
            <Container className="pt-lg-2">
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5">
                    <div className="site-logo-container">
                        <img src={logo} className="img-fluid" alt="everytindiscount logo" />
                      </div>
                      <div className="text-center text-muted mb-3 mt-3">
                        <small>Create a new account with your credentials</small>
                      </div>
                      <Form role="form" onSubmit={e => handleSubmit(e)}>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-hat-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input 
                            placeholder="Name" 
                            type="text"
                            name="name"
                            autoComplete="off"
                            value={signupData.name}
                            required
                            onChange={e => updateSignupForm(e)}
                             />
                          </InputGroup>
                        </FormGroup>
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
                              value={signupData.email}
                              onChange={e => updateSignupForm(e)}
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
                              required
                              name="password"
                              value={signupData.password}
                              onChange={e => updateSignupForm(e)}
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
                              placeholder="Confirm Password"
                              type="password"
                              required
                              autoComplete="off"
                              name="password2"
                              value={signupData.password2}
                              onChange={e => updateSignupForm(e)}
                            />
                          </InputGroup>
                        </FormGroup>
                        {/* <Row className="my-4">
                          <Col xs="12">
                            <div className="custom-control custom-control-alternative custom-checkbox">
                              <input
                                className="custom-control-input"
                                id="customCheckRegister"
                                type="checkbox"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="customCheckRegister"
                              >
                                <span>
                                  I agree with the{" "}
                                  <a
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                  >
                                    Privacy Policy
                                  </a>
                                </span>
                              </label>
                            </div>
                          </Col>
                        </Row> */}
                        <div className="text-center">
                          <Button
                            className="mt-3 btn-signup"
                            color="primary"
                            type="submit"
                            disabled={loading}
                          >
                            Sign up
                          </Button>
                        </div>
                      </Form>
                      <Row className="mt-3"> 
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
                    <p className="small-text">Already Have An Account?</p>
                    </Col>
                    <Col sm="5">
                    <Link className="signin-cta mb-2" to="/login">Sign in</Link>
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

export default withRouter(Register)