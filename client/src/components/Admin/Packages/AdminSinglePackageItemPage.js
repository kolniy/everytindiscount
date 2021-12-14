import React, { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { Container, Row, Card, 
    CardHeader, CardBody,
     Col, Button
    } from 'reactstrap'
import VerticalNavbar from '../VerticalNavbar'
import AdminNavbar from '../AdminNavbar'
import AdminDashboardSummary from '../AdminDashboardSummary'
import updateActiveLink from '../../../state/activeLinkInAdminDashboard'
import PackagePlansContainer from './PackagePlansContainer'
import UpdatePackageModal from './UpdatePackageModal'
import DeletePackageModalConfirmation from './DeletePackageModalConfirmation'

export const SINGLE_PACKAGE_QUERY = gql`
    query ($packageId: ID!){
    singlePackage(packageId: $packageId) {
    id
    packagetype {
      name
    }
    packagename
    packageimage
    packagelandingpageimage
    packagediscountpercard
    packagediscountperbanktransfer
    packagedescription
    packagelogo
    packageplan {
      id
      planname
      plandescription
      planprice
      createdat
    }
  }
}
`
const SinglePackageItemPage = ({ match }) => {

    useEffect(() => {
        updateActiveLink({
            type:"UPDATE_ACTIVE_LINK",
            payload: 6
        })

        // document.documentElement.scrollTop = 0;
        // document.scrollingElement.scrollTop = 0;
    }, [])

    const { data, error, loading } = useQuery(SINGLE_PACKAGE_QUERY, {
        variables: {
            packageId: match.params.packageitemId
        }
    })

    const [ displayUpdateModal, setDisplayUpdateModal ] = useState(false)
    const [ deleteModalOpen, setDisplayDeleteModalOpen ] = useState(false)

    const toggleDisplayUpdateModal = () => setDisplayUpdateModal(!displayUpdateModal)
    const toggleDisplayDeleteModal = () => setDisplayDeleteModalOpen(!deleteModalOpen)

    if(error){
        return <p className="text-center">Error: {error}</p>
     }

    return <>
      <VerticalNavbar />
      <div className="main-content">
          <AdminNavbar />
          <AdminDashboardSummary />
            {
                loading ? <>
                     <Container className="mt--7" fluid>
                    <Row>
                        <div className="col">
                        <Card className="shadow">
                            <CardBody className="package-body">
                               <div style={{
                                   width:'100%',
                                   display:'flex',
                                   height:'20vh',
                                   justifyContent:'center',
                                   alignItems:'center'
                               }}>
                                  <i className="fas fa-spinner fa-spin"></i> 
                                </div>                     
                           </CardBody>
                     </Card>
                    </div>
                </Row>
            </Container>        
                </> :
                 <>
                 <Container className="mt--7 mb-4" fluid>
                    <Row>
                        <div className="col">
                        <Card className="shadow">
                            <CardHeader className="bg-transparent package-header">
                            <h3 style={{
                                fontSize:'17px',
                                fontWeight:'600',
                                textTransform:'uppercase',
                                color:'#000'
                            }} className="mb-0">{data.singlePackage?.packagename}</h3>
                            </CardHeader>
                            <CardBody className="package-body">
                                <div className="package-item-page-contents">
                                    <Row>
                                    <Col sm="2" md="2" lg="2">
                                      <div className="package-item-img-container">
                                          <img className="img-fluid" src={data.singlePackage?.packagelogo} alt="..." />
                                     </div>
                                    </Col>
                                    <Col  sm="10" md="10" lg="10">
                                        <div className="package-item-description mb-3">
                                               <div className="package-description-details">
                                                    <p className="package-title">Package Name:</p> <p>{data.singlePackage?.packagename}</p>
                                                </div>
                                                <div className="package-description-details">
                                                    <p className="package-title">Package Type:</p> <p>{data.singlePackage.packagetype?.name}</p>
                                                </div>
                                                <div className="package-description-details">
                                                    <p className="package-title">Discount Per Bank Transfer:</p> <p>{data.singlePackage?.packagediscountperbanktransfer}</p>
                                                </div>
                                                <div className="package-description-details">
                                                  <p className="package-title">Discount Per Card:</p> <p>{data.singlePackage?.packagediscountpercard}</p>
                                                </div>
                                                <div className="package-description-details">
                                                  <p className="package-title">Package Description:</p>
                                                   <p style={{textAlign:'right'}}>{data.singlePackage?.packagedescription}</p>
                                                </div>
                                        </div>
                                        <div className="action-containers">
                                            <Button onClick={e => setDisplayUpdateModal(true)} className="pl-5 pr-5" color="primary">Update</Button>
                                            <Button onClick={e => setDisplayDeleteModalOpen(true)} className="pl-5 pr-5" outline color="primary">Delete</Button>
                                        </div>
                                    </Col>
                                    </Row>    
                              <Row>
                                 <PackagePlansContainer 
                                 packagePlans={data.singlePackage.packageplan} 
                                 packageLogo={data.singlePackage.packagelogo}
                                 />
                             </Row>
                        </div>               
                    </CardBody>
                    </Card>
                </div>
                </Row>
            </Container>        
                <UpdatePackageModal
                    displayModal={displayUpdateModal}
                    toggleModal={toggleDisplayUpdateModal}
                    packageData={data.singlePackage}
                />
                <DeletePackageModalConfirmation 
                    deleteModalOpen={deleteModalOpen}
                    toggleDeleteModalOpen={toggleDisplayDeleteModal}
                    packageId={data.singlePackage.id}
                />
                </>
            }
      </div>
    </>
}

export default SinglePackageItemPage
