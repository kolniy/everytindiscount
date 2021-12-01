import React, { useEffect, useState } from 'react'
import { Container, Row,
     Card, CardHeader,
     CardBody } from 'reactstrap'
import { useQuery, gql } from '@apollo/client'
import VerticalNavbar from '../VerticalNavbar'
import AdminNavbar from '../AdminNavbar'
import AdminDashboardSummary from '../AdminDashboardSummary'
import updateActiveLink from '../../../state/activeLinkInAdminDashboard'
import PackageTypeItem from './PackageTypeItem'
import AddNewPackageTypeModal from './AddNewPackageTypeModal'

export const GET_PACKAGE_TYPES = gql`
    query {
        packagetypes{
        id
        iconname
        name
      }
}
`

export const PackageTypePage = () => {

    useEffect(() => {
        updateActiveLink({
            type:"UPDATE_ACTIVE_LINK",
            payload: 5
        })
    }, [])

    const { data, loading } = useQuery(GET_PACKAGE_TYPES)
    const [ showAddPackageTypeModal, setShowAddPackageTypeModal ] = useState(false)

    const toggleAddPackageTypeModal = () => setShowAddPackageTypeModal(!showAddPackageTypeModal)

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
                            }} className="mb-0">Package Types</h3>

                            <div onClick={toggleAddPackageTypeModal} className="addpackage-type-icon">
                                <i className="fas fa-plus"></i>
                            </div>
                            </CardHeader>
                            <CardBody className="package-type-body">
                            <Row className="icon-examples">
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
                                        {
                                            data.packagetypes.length === 0 ? <>
                                                <p className="lead text-center">No Package Type</p>
                                            </> : <>
                                                {
                                                    data.packagetypes.map((packagetypeItem) => {
                                                        return <PackageTypeItem key={packagetypeItem.id} packagetype={packagetypeItem} />
                                                    })
                                                }
                                            </>
                                        }
                                    </>
                                }
                               
                            </Row>
                        </CardBody>
                    </Card>
                </div>
            </Row>
            </Container>
        </div>
        <AddNewPackageTypeModal
            showAddPackageTypeModal={showAddPackageTypeModal}
            toggleAddPackageTypeModal={toggleAddPackageTypeModal}
        />
    </>
}

export default PackageTypePage
