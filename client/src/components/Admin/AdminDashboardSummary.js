import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import CurrencyFormat from 'react-currency-format'

const ADMIN_TRANSACTION_COUNT = gql`
  query{
    adminTransactionCount
  }
`

const ADMIN_USER_COUNT = gql`
  query{
    adminUsersCount
  }
`

const ADMIN_SALES_SUM = gql`
   query{
    adminSaleSum
   }
`

const ADMIN_PACKAGES_COUNT = gql`
  query{
    adminPackagesCount
  }
`

const AdminDashboardSummary = () => {

    const { data: transactionCountData, loading: transactionCountLoading } = useQuery(ADMIN_TRANSACTION_COUNT)
    const { data: adminUserCountData, loading: adminUserCountLoading } = useQuery(ADMIN_USER_COUNT)
    const { data: adminSalesSumData, loading: adminSalesSumLoading } = useQuery(ADMIN_SALES_SUM)
    const { data: adminPackagesCountData, loading: adminPackagesCountLoading } = useQuery(ADMIN_PACKAGES_COUNT)

    return <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
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
                            style={{fontSize:'13px'}}
                          >
                            Transactions
                          </CardTitle>
                        </Col>
                        <Col xs="12" sm="12" md="12">
                            <div className="statistics-counter-and-summary">
                              {
                                transactionCountLoading ? <div>
                                  <i className="fas fa-spinner fa-spin"></i> 
                                </div> : <div className="h2 font-weight-bold mb-0">
                                  {transactionCountData.adminTransactionCount}
                               </div>
                              }
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
                            style={{fontSize:'13px'}}
                          >
                            Users
                          </CardTitle>
                        </Col>
                        <Col xs="12" sm="12" md="12">
                        <div className="statistics-counter-and-summary">
                            {
                              adminUserCountLoading ? <div>
                                  <i className="fas fa-spinner fa-spin"></i> 
                                 </div> :
                               <div className="h2 font-weight-bold mb-0">
                                 {adminUserCountData.adminUsersCount}
                             </div>
                            }
                                
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
                            style={{fontSize:'13px'}}
                          >
                            Sales
                          </CardTitle>
                        </Col>
                        <Col xs="12" sm="12" md="12">
                        <div className="statistics-counter-and-summary">
                          {
                            adminSalesSumLoading ? <div>
                              <i className="fas fa-spinner fa-spin"></i> 
                            </div> : <div className="h4 font-weight-bold mb-0">
                            <CurrencyFormat 
                            value={adminSalesSumData.adminSaleSum}
                            prefix={'#'}
                            displayType='text'
                            thousandSeparator={true}
                            />
                        </div>
                          }
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
                            style={{fontSize:'13px'}}
                          >
                            Packages
                          </CardTitle>
                        </Col>
                        <Col xs="12" sm="12" md="12">
                        <div className="statistics-counter-and-summary">
                          {
                            adminPackagesCountLoading ? <div>
                               <i className="fas fa-spinner fa-spin"></i> 
                            </div> :  <div className="h2 font-weight-bold mb-0">{adminPackagesCountData.adminPackagesCount}</div>
                          }
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
