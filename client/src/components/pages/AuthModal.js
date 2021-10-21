import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import authDispatch from '../../state/auth'
import { Modal, Card,
    CardBody, Input, 
    CardHeader, Button,
    Form,  FormGroup, 
    InputGroup, InputGroupAddon,
    InputGroupText, Nav,
    NavItem, NavLink
} from 'reactstrap'
import { useAlert } from 'react-alert'
import logo from '../../images/logo.png'

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
}`

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

export const AuthModal = ({ openAuthModal, toggleAuthModal }) => {

    const [ loginDetails, setLoginDetails ] = useState({
        email: "",
        password: ""
    })

    const [ registerDetails, setRegisterDetails ] = useState({
        name:"",
        email:"",
        password:"",
        password2:""
    })

    const alert = useAlert()

    const [ signup, { loading } ] = useMutation(SIGN_UP, {
        variables: {
          signupData: {
            name: registerDetails.name,
            email: registerDetails.email,
            password: registerDetails.password,
            isAdmin: false
          }
        },
        onCompleted: ({ signup }) => {
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
          setLoginDetails({
              email:"",
              password:""
          })
        },
        onError: (error) => {
          console.log(error)
          alert.show(error.message, {
            type:'error'
          })
        }
      })

    const [ signin, { loading: loginLoading } ] = useMutation(SIGN_IN, {
        variables: {
          signinData: {
            email: loginDetails.email,
            password: loginDetails.password
          }
        },
        onCompleted: ({ signin }) => {
          localStorage.setItem('token', signin.token)
          alert.show('sign in was successful', {
            type:'success'
          })
          authDispatch({
            type: "USER_LOGIN",
            payload: {
              token: signin.token,
              user: signin.user,
              isAuthenticated: true
            }
          })
          setRegisterDetails({
              name:"",
              email:"",
              password:"",
              password2:""
          })
        },
        onError: (error) => {
          alert.show(error.message, {
            type:'error'
          })
        }
      })

    const updateLoginDetails = (e) => setLoginDetails({
        ...loginDetails,
        [e.target.name]: e.target.value
    })

    const updateRegisterDetails = (e) => setRegisterDetails({
        ...registerDetails,
        [e.target.name]: e.target.value
    })

    const [ iconTabs, setIconTabs ] = useState(1)
    const toggleNavs = (e, index) => {
        e.preventDefault()
        setIconTabs(index)
    }

    const onHandleLoginSubmit = (e) => {
        e.preventDefault()

        if(loginDetails.email.length === 0){
            return alert.show('email cannot be empty', {
              type:'error'
            })
          }
          if(loginDetails.password.length === 0){
            return alert.show('password cannot empty', {
              type:'error'
            })
          }
         
          signin()
          toggleAuthModal()
    }

    const onHandleRegisterSubmit = (e) => {
        e.preventDefault()
       
        if(registerDetails.name.length === 0){
            return alert.show('name cannot be empty', {
              type:'error'
            })
          }
          if(registerDetails.email.length === 0){
            return alert.show('lastname cannot be empty', {
              type:'error'
            })
          }
          if(registerDetails.password.length === 0){
            return alert.show('email cannot be empty', {
              type:'error'
            })
          }
          if(registerDetails.password2.length === 0){
            return alert.show('confirm password cannot be empty', {
              type:'error'
            })
          }

          if(registerDetails.password !== registerDetails.password2){
            return alert.show('invalid confirm password', {
              type:'error'
            })
          }
          
          signup()
          toggleAuthModal()
    }

    return <>
        <Modal
              className="modal-dialog-centered"
              size="sm"
              isOpen={openAuthModal}
              toggle={toggleAuthModal}
            >
              <div className="auth-modal-contents modal-body p-0">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-transparent pb-3">
                    <div onClick={toggleAuthModal} className="close-modal-btn">X</div>
                    <div className="auth-modal-img-container">
                      <img src={logo} className="img-fluid" alt="everytindiscount logo"/>
                    </div>
                    <div className="text-muted text-center mt-2 mb-3">
                      <small className="auth-text">Login Or Register to Continue</small>
                    </div>
                    <div className="btn-wrapper text-center">
                    <Nav
                        className="nav-fill flex-column flex-md-row"
                        id="tabs-icons-text"
                        pills
                        role="tablist"
                    >
                        <NavItem>
                        <NavLink
                            aria-selected={iconTabs === 1}
                            className={`mb-sm-3 mb-md-0 ${iconTabs === 1 && 'active'}`}
                            onClick={e => toggleNavs(e, 1)}
                            href="#pablo"
                            role="tab"
                        >
                            Login
                        </NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink
                            aria-selected={iconTabs === 2}
                            className={`mb-sm-3 mb-md-0 ${iconTabs === 2 && 'active'}`}
                            onClick={e => toggleNavs(e, 2)}
                            href="#pablo"
                            role="tab"
                        >
                            Register
                        </NavLink>
                        </NavItem>
                     </Nav>
                    </div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    {
                        iconTabs === 1 ? <>
                            <div className="text-center text-muted mb-4">
                            <small>Login</small>
                          </div>
                          <Form role="form" onSubmit={e => onHandleLoginSubmit(e)}>
                            <FormGroup className="mb-3">
                              <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-email-83" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                 placeholder="Email"
                                 type="email" 
                                 name="email"
                                 required
                                 value={loginDetails.email}
                                 onChange={e => updateLoginDetails(e)}
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
                                 name="password"
                                 required
                                 value={loginDetails.password}
                                 onChange={e => updateLoginDetails(e)}
                                 />
                              </InputGroup>
                            </FormGroup>
                            <div className="text-center">
                              <Button
                                className="my-4"
                                color="primary"
                                type="submit"
                                disabled={loginLoading}
                              >
                               {
                                   loginLoading ? <>
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
                        </> : <>
                        <div className="text-center text-muted mb-4">
                      <small>Register</small>
                    </div>
                    <Form role="form" onSubmit={e => onHandleRegisterSubmit(e)}>
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
                            required
                            value={registerDetails.name}
                            onChange={e => updateRegisterDetails(e)}
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
                              value={registerDetails.email}
                              onChange={e => updateRegisterDetails(e)}
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
                              value={registerDetails.password}
                              onChange={e => updateRegisterDetails(e)}
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
                              value={registerDetails.password2}
                              onChange={e => updateRegisterDetails(e)}
                            />
                          </InputGroup>
                        </FormGroup>
                        <div className="text-center">
                            <Button
                              className="btn-icon navbar-btn"
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
                                <span className="btn-inner--icon">
                                <i className="ni ni-single-02"></i>
                                </span>
                                <span className="nav-link-inner--text ml-1">
                                    Register
                                </span>
                                 </>
                                }
                            </Button>
                        </div>
                      </Form>
                        </>
                    }
                  </CardBody>
                </Card>
              </div>
            </Modal>
    </>
}

export default AuthModal