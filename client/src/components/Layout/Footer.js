import React from "react"
import { Container, Row, Col } from "reactstrap"
import { Link } from "react-router-dom"
import footerLogo from "../../images/footer-logo.png"

const Footer = () => {
    return <>
    <section className="footer-section">
        <Container>
            <Row>
                <Col md="6" lg="6">
            <div className="footer-img-container">
                <img src={footerLogo} alt="footer logo" className="img-fluid" />
            </div>
        <p className="footer-para">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor voluptates pariatur odit. Quaerat obcaecati, fugit eligendi sapiente eum nesciunt laboriosam eos aliquam quos ad! Recusandae sequi possimus dolores ex provident
        </p>
        <div className="footer-icons">
            <a href="https://www.facebook.com/everytindiscount/" rel="noopener noreferrer" target="_blank" className="social-icon-facebook"> <i className="fa fa-facebook-official" aria-hidden="true"></i><p className="no-display">Facebook</p></a>

            <a href="https://www.instagram.com/everytindiscount/" rel="noopener noreferrer" target="_blank" className="social-icon"><i className="fa fa-instagram" aria-hidden="true"></i><p className="no-display">some hidden text</p></a>
        </div>
                </Col>
                <Col className="mb-2 mt-3" md="3" lg="3">
                 <h4 className="footer-heading">
                     Help and Support
                 </h4>
                 <Link className="footer-links" to="/#category">Categories</Link>
                 <Link className="footer-links" to="/#about">About Us</Link>
                 <Link className="footer-links" to="/#contact">Contact</Link>
                </Col>
                <Col className="mt-3" md="3" lg="3">
                <h4 className="footer-heading">
                    Quick Links
                 </h4>
                    <Link className="footer-links" to="/signup">Register</Link>
                    <Link className="footer-links" to="/login">Login</Link>
                </Col>
            </Row>
            <div className="site-copyright">
                <h3 className="copyright-info text-center">
                 Everytindiscount  &copy; {new Date().getFullYear()}. All Rights Reserved
                </h3>
            </div>
        </Container>
    </section>
    </>
}

export default Footer