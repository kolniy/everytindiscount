import React from "react"
import { Col, Card, CardImg, CardBody, Button } from "reactstrap"

const CategoryItem = ({ billerLogo, billerName, billerDesc }) => {
    return <>
        <Col md="4" lg="4" className="mb-4">
                      <Card className="card-lift--hover shadow border-0 category-item">
                        <CardBody className="py-5">
                          <div className="card-image-container">
                          <CardImg
                            src={billerLogo}
                            alt="biller logo"
                           />
                          </div>
                          <h6 className="text-primary text-uppercase">
                              {billerName}
                          </h6>
                          <p className="description mt-3">
                                {billerDesc}
                          </p>
                          <Button
                            className="mt-4"
                            color="primary"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            Learn more
                          </Button>
                        </CardBody>
                      </Card>
            </Col>
    </>
}

export default CategoryItem