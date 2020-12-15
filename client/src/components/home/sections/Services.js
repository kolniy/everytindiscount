import React from "react"
import { Container, Row, Col } from "reactstrap"
import CardBlue from "./cards/CardBlue"
import CardOrange from "./cards/CardOrange"
import CardGreen from "./cards/CardGreen"
import CardRed from "./cards/CardRed"

const Services = () => {
    return (
        <>
        <div id="services" className="services">
            <Container>
                <h2 className="text-center site-section-heading">Our Services</h2>
                <Row>
                    <Col md="4">
                        <CardBlue />
                    </Col>
                    <Col md="4">
                    <CardOrange />
                    </Col>
                    <Col md="4">
                    <CardGreen />
                    </Col>
                    <Col md="4">
                    <CardRed />
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    )
}

export default Services