import React from "react"
import { Container } from "reactstrap"

const About = () => {
    return <>
    <section id="about" className="about-section">
       <span className="about-circles circle-1"></span>
        <span className="about-circles circle-2"></span>
        <span className="about-circles circle-3"></span>
        <span className="about-circles circle-4"></span>
    <Container className="services-container">
    <h2 className="text-center site-section-heading color-white">About Us</h2>
        <p className="lead text-center color-white">
        Everytindiscount.com is an online service provider with a base in Nigera..our aim is to bring services to the doorsteps of all nigerians in order to save our esteemed customers valuable time and trsnsportation cost. And still offer discounts that can be used to enjoy other services. We deliver our services with utmost courtesy, emphaty and integrity.
        </p>
    </Container>
    </section>
    </>
}

export default About
