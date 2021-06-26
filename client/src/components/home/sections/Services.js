import React from "react"
import { Container, Row, Col } from "reactstrap"
import CardBlue from "./cards/CardBlue"
import CardOrange from "./cards/CardOrange"
import CardGreen from "./cards/CardGreen"
import CardRed from "./cards/CardRed"

const Services = () => {
    return (
        <>
        <div id="services" className="services text-center">
            <Container className="services-container" fluid>
                <h2 className="text-center site-section-heading">Our Services</h2>
                <Row>
                    <Col sm="6" md="3">
                        <CardBlue />
                    </Col>
                    <Col sm="6" md="3">
                    <CardOrange />
                    </Col>
                    <Col sm="6" md="3">
                    <CardGreen />
                    </Col>
                    <Col sm="6" md="3">
                    <CardRed />
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    )
}

export default Services