import React, { useEffect, useState } from 'react'
import { Container, Row, Card, CardHeader, CardBody } from 'reactstrap'
import VerticalNavbar from '../VerticalNavbar'
import AdminNavbar from '../AdminNavbar'
import AdminDashboardSummary from '../AdminDashboardSummary'
import updateActiveLink from '../../../state/activeLinkInAdminDashboard'
import PackageCategoryTabs from './PackageCategoryTabs'

const PackagesPage = () => {

    useEffect(() => {
        updateActiveLink({
            type:"UPDATE_ACTIVE_LINK",
            payload: 6
        })
    }, [])

    const [ showAddNewPackageModal, setShowAddNewPackageModal ] = useState(false)
    const toggleShowAddNewPackageModal = () => setShowAddNewPackageModal(!showAddNewPackageModal)

    return <>
        <VerticalNavbar />
        <div className="main-content">
            <AdminNavbar />
            <AdminDashboardSummary />

            <Container className="mt--7" fluid>
                    <Row>
                        <div className="col">
                        <Card className="shadow">
                            <CardHeader className="bg-transparent package-header">
                            <h3 style={{
                                fontSize:'17px',
                                fontWeight:'600'
                            }} className="mb-0">Packages</h3>

                            <div onClick={toggleShowAddNewPackageModal} className="addpackage-type-icon">
                                <i className="fas fa-plus"></i>
                            </div>
                            </CardHeader>
                            <CardBody className="package-body">
                                <div className="package-category-container">
                                  <PackageCategoryTabs
                                    showAddNewPackageModal={showAddNewPackageModal}
                                    toggleShowAddNewPackageModal={toggleShowAddNewPackageModal}
                                  />
                                </div>
                          </CardBody>
                    </Card>
                </div>
            </Row>
            </Container>
        </div>
    </>
}

export default PackagesPage
