import React from "react"
import { Container, Row, Col } from "reactstrap"
import ContactForm from "./ContactForm"

const Contact = () => {
    return <>
    <div id="contact" className="contact-section">
    <Container>
        <h2 className="text-center site-section-heading">Contact Us</h2>
        <p className="para-style description text-center">
            Have a Question, Want to make an Enquiry, Or Simply want to say Hello. Reach out to us in any of the follwing ways.
        </p>

    <Row className="contact-us-methods">
        <Col md="6" sx="6">
            <div className="contact-section-social">
            <p className="h6">Follow us on</p>
            
            <div className="social-icons-section">
            <span className="social-icon-link">
            <a href="https://www.facebook.com/everytindiscount/" rel="noopener noreferrer" target="_blank"> <i className="fa fa-facebook-official social-icon" aria-hidden="true"></i><span className="no-display">Facebook</span></a>
            </span>
            <span className="social-icon-link">
            <a href="https://www.instagram.com/everytindiscount/" rel="noopener noreferrer" target="_blank"><i className="fa fa-instagram social-icon" aria-hidden="true"></i><span className="no-display">some hidden text</span></a>
            </span>
            <p className="h6 mt-3">Email</p>
            <p className="silent"><i className="fa fa-envelope" aria-hidden="true"></i>{"  "}
            customerservice@everytindiscount.com</p>
            <p className="h6">Telephone</p>
            <p className="silent"><i className="fa fa-phone" aria-hidden="true"></i>{"  "}+2347043869050</p>
        </div>
            </div>
        </Col>
        <Col md="6" sx="6">
            <div className="contact-section-form">
            <ContactForm />
            </div>
        </Col>
    </Row>
    </Container>
    </div>
    </>
}

export default Contact