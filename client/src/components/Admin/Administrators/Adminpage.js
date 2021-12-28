import React, { useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import { Container, Card, Row, CardBody, CardHeader } from 'reactstrap'
import VerticalNavbar from '../VerticalNavbar'
import AdminNavbar from '../AdminNavbar'
import AdminDashboardSummary from '../AdminDashboardSummary'
import updateActiveLink from '../../../state/activeLinkInAdminDashboard'
import AdminAccountsContainer from './AdminAccountsContainer'

const GET_ADMIN_USERS = gql`
    query{
    adminAccounts {
        id
        name
        email
        role
     }
    }
`

export const Adminpage = () => {

    useEffect(() => {
        updateActiveLink({
            type:"UPDATE_ACTIVE_LINK",
            payload: 2
        })
    }, [])

    const { data, loading } = useQuery(GET_ADMIN_USERS)
    console.log(data.adminAccounts, 'admin users')
    return <>
    <VerticalNavbar />
    <div className="main-content">
            <AdminNavbar />
            <AdminDashboardSummary />

            <Container className="mt--7" fluid>
                    <Row>
                        <div className="col">
                        <Card className="shadow">
                            <CardHeader className="bg-transparent package-type-header">
                            <h3 style={{
                                fontSize:'17px',
                                fontWeight:'600'
                            }} className="mb-0">Administrators</h3>

                            <div className="addadmin-type-icon">
                                <i className="fas fa-plus"></i>
                            </div>
                            </CardHeader>
                            <CardBody>
                                {
                                loading ? <>
                                <div style={{
                                    display:'flex',
                                    width:'50%',
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}>
                            <i className="fas fa-spinner fa-spin"></i> 
                                 </div>
                                 </> : <>
                                    <AdminAccountsContainer accounts={data.adminAccounts} /> 
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

export default Adminpage