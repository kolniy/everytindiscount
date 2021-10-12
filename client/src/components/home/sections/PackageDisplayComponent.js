import React, { useEffect } from 'react'
import { useQuery, gql } from "@apollo/client"
import { Card, CardBody, TabContent, TabPane, Row,  } from 'reactstrap'
import CategoryItem from './CategoryItem'

const getPackagesFromPackageTypeId = gql`
    query ($packageTypeId: ID!) {
    packages(packageTypeId: $packageTypeId) {
    packagename
    packagelogo
    packagelandingpageimage
    packageimage
    packagediscount
    packagedescription
  }
}
`

const PackageDisplayComponent = ({
    activeTabId
}) => {

    const { data, error, loading, refetch } = useQuery(getPackagesFromPackageTypeId, {
        variables: {
            packageTypeId: activeTabId
        }
    })

    useEffect(() => {
      refetch({
        packageTypeId: activeTabId
      })
    }, [refetch, activeTabId])

    if(loading){
        return (<div style={{
            width:'50%',
            margin:'20px auto',
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
        }}>
         <i style={{fontSize:'22px'}} className="fas fa-circle-notch fa-spin"></i></div>)
    }

    if(error){
        return <p className="text-center mt-3 mb-3">error {error}</p>
    }

    return <>
        <Card>
              <CardBody>
                <TabContent>
                  <TabPane>
                <Row>
                 {
                data.packages.length === 0 ? 
                <p className="text center mt-3 mb-3">Package not found in this category</p> : 
                <>
                {
                     data.packages.map((packageItem) => 
                     <CategoryItem key={packageItem.id} 
                     billerLogo={packageItem.packagelogo}
                     billerName={packageItem.packagename}
                      billerDesc={packageItem.packagedescription} />)
                }
                 </>
                 }
                </Row>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
    </>
}

export default PackageDisplayComponent
