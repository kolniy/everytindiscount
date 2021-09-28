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

const Register = () => {
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
                      <Form role="form">
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-hat-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Name" type="text" />
                          </InputGroup>
                        </FormGroup>
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
                        <Row className="my-4">
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
                        </Row>
                        <div className="text-center">
                          <Button
                            className="mt-3 btn-signup"
                            color="primary"
                            type="button"
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

export default Register