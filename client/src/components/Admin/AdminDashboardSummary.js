import React from 'react'
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";


const AdminDashboardSummary = () => {
    return <>
        <div className="header bg-gradient-primary pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                      <Col xs="12" sm="12" md="12">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Transactions
                          </CardTitle>
                        </Col>
                        <Col xs="12" sm="12" md="12">
                            <div className="statistics-counter-and-summary">
                                <div className="h2 font-weight-bold mb-0">
                                350,897
                               </div>
                              <div className="icon icon-shape bg-danger text-white rounded-circle shadow ml-3">
                                <i className="fas fa-chart-bar" />
                              </div>
                            </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                      <Col xs="12" sm="12" md="12">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Users
                          </CardTitle>
                        </Col>
                        <Col xs="12" sm="12" md="12">
                        <div className="statistics-counter-and-summary">
                                <div className="h2 font-weight-bold mb-0">
                                2,356
                            </div>
                            <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                <i className="fas fa-users" />
                            </div>
                        </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                    <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <Col xs="12" sm="12" md="12">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Sales
                          </CardTitle>
                        </Col>
                        <Col xs="12" sm="12" md="12">
                        <div className="statistics-counter-and-summary">
                                <div className="h2 font-weight-bold mb-0">
                                2,356
                            </div>
                            <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                              <i className="fas fa-chart-pie" />
                            </div>
                        </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <Col xs="12" sm="12" md="12">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Packages
                          </CardTitle>
                        </Col>
                        <Col xs="12" sm="12" md="12">
                        <div className="statistics-counter-and-summary">
                         <div className="h2 font-weight-bold mb-0">924</div>
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                          </div>
                        </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
    </>
}   

export default AdminDashboardSummary
