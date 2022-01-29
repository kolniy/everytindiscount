import React, { useEffect } from 'react' 
import { useQuery, gql } from '@apollo/client'
import { Container, Row,
    Card, CardHeader,
    CardBody, Table } from 'reactstrap'
import VerticalNavbar from '../VerticalNavbar'
import AdminNavbar from '../AdminNavbar'
import AdminDashboardSummary from '../AdminDashboardSummary'
import updateActiveLink from '../../../state/activeLinkInAdminDashboard'
import TransactionItem from './TransactionItem'

export const GET_TRANSACTIONS = gql`
    query {
    transactions{
        id
        createdat
        amount
        valuerecipient
        paymentmethod
        reference
        paymentreference
        isseen
        transactionby {
        name
        email
        phonenumber
     }
        packageplan{ 
        planname
        planprice
        packagetype {
            name
        }
     }
     }
  }
`

const TransactionsPage = () => {

    useEffect(() => {
        updateActiveLink({
            type:"UPDATE_ACTIVE_LINK",
            payload: 4
        })
    }, [])

    const { data, loading } = useQuery(GET_TRANSACTIONS)

    return <>
        <VerticalNavbar />
        <div className="main-content">
            <AdminNavbar />
            <AdminDashboardSummary />

            <Container className='mt--6' fluid>
                <Row>
                  <div className="col">
                      <Card className='shadow'>
                      <CardHeader className="bg-transparent">
                            <h3 style={{
                                fontSize:'17px',
                                fontWeight:'600'
                            }} className="mb-0">Transactions</h3>
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
                             <Table 
                             className="align-items-center table-flush" responsive>
                                <thead className='thead-light'>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope='col'>Plan Name</th>
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
                                data.transactions.length === 0 ? <>
                                     <p className="lead text-center">No Transactions Found</p>
                                </> : <>
                                    {
                                        data.transactions.map((transaction) => {
                                            return <TransactionItem key={transaction.id} 
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

export default TransactionsPage
