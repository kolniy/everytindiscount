import React from "react"
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

const Login = () => {
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
                      <Form role="form">
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Email" type="email" />
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
                            />
                          </InputGroup>
                        </FormGroup>
                        <div className="text-muted mt-1 mb-1">
                        <small>Forgot your passord? Click Here</small>
                      </div>
                        <div className="text-center">
                          <Button
                            className="mt-4 btn-login"
                            color="primary"
                            type="button"
                          >
                            Login
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
                    <Link className="signin-cta" to="/signup">Sign up</Link>
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

export default Login