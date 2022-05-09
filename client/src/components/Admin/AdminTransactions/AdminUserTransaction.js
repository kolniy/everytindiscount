import React, { useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import { Container, Row, Card, 
  CardBody, Table, CardHeader } from 'reactstrap'
import VerticalNavbar from '../VerticalNavbar'
import AdminNavbar from '../AdminNavbar'
import AdminDashboardSummary from '../AdminDashboardSummary'
import updateActiveLink from '../../../state/activeLinkInAdminDashboard'
import AdminUserTransactionItem from './AdminUserTransactionItem'

export const GET_USER_TRANSACTIONS = gql`
  query {
    adminUserTransactions {
        id
        createdat
        amount
        valuerecipient
        paymentmethod
        reference
        paymentreference
        isseen
        vendor
        transactionby {
        name
        email
        phonenumber
        }
        packageplan { 
        planname
        packagetype {
            name
        }
      }
    }
  }
`

const AdminTransaction = () => {

  const { data, loading } = useQuery(GET_USER_TRANSACTIONS)

  useEffect(() => {
    updateActiveLink({
      type: "UPDATE_ACTIVE_LINK",
      payload: 3
    })
  }, [])

  return <>
    <VerticalNavbar />
    <div className="main-content">
        <AdminNavbar />
        <AdminDashboardSummary />

        <Container className='mt--6' fluid>
          <Row>
            <div className="col">
              <Card className='shadow'>
                <CardHeader className='bg-transparent'>
                  <h3 style={{
                    fontSize:'17px',
                    fontWeight:'600'
                  }} className="mb-0">My Transactions</h3>
                </CardHeader>
                <CardBody style={{
                         height:'80vh',
                         overflowY:'auto'
                     }}>
                     {
                       loading ? <>
                        <div style={{
                            display:'flex',
                            width:'100%',
                            justifyContent:'center',
                            alignItems:'center'
                        }}>
                        <i className="fas fa-spinner fa-spin"></i> 
                            </div>
                       </> : <>
                          <Table className="align-items-center table-flush" responsive>
                            <thead className='thead-light'>
                              <tr>
                              <th scope="col">Date</th>
                                <th scope='col'>Plan Name</th>
                                <th scope='col'>Vendor</th>
                                <th scope='col'>Plan Type</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Value Recipient</th>
                                <th scope="col">Payment Method</th>
                                <th scope="col">Reference</th>
                                <th scope="col">Payment Reference</th>
                                <th scope='col'>User Name</th>
                                <th scope='col'>User Email</th>
                                <th scope='col'>User No.</th>
                              </tr>
                            </thead>
                            <tbody>
                               {
                                 data?.adminUserTransactions?.length === 0 ? <>
                                     <p className="lead text-center">No Transactions Found</p>
                                 </> : <>
                                      {
                                        data?.adminUserTransactions.map((transaction) => {
                                          return <AdminUserTransactionItem  
                                            key={transaction.id} 
                                            transaction={transaction}
                                          />
                                        })
                                      }
                                 </>
                               }
                            </tbody>
                          </Table>
                       </>
                     }
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
    </div>
  </>
}

export default AdminTransaction
