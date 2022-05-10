import React, { useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import { Card, CardBody, TabContent, TabPane, Row, } from 'reactstrap'
import IndexPackageItem from './IndexPackageItem'

const getPackagesFromPackageTypeIdAndName = gql`
    query ($packageTypeId: ID!, $queryString: String!) {
    getPackagesInClientDashboard(
        packageTypeId: $packageTypeId,
        queryString: $queryString
    ) {
    id
    packagename
    packagelogo
    packagelandingpageimage
    packageimage
    packagedescription
  }
}
`

const IndexPackageDisplayComponent = ({
    activeTabId,
    searchQuery
}) => {

    const { data, error, loading, refetch } = useQuery(getPackagesFromPackageTypeIdAndName, {
        variables: {
            packageTypeId: activeTabId,
            queryString: searchQuery
        }
    })

    useEffect(() => {
        refetch({
            packageTypeId: activeTabId,
            queryString: searchQuery
        })
    }, [activeTabId, searchQuery, refetch])

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
                data.getPackagesInClientDashboard.length === 0 ? 
                  <div style={{
                    display:'flex',
                    alignContent:'center',
                    justifyContent:'center',
                    width:'100%'
                  }}>
                    <p className="text-center mt-3 mb-3">Package not found in this category</p>
                  </div> : 
                <>
                {
                     data.getPackagesInClientDashboard.map((packageItem) => 
                     <IndexPackageItem key={packageItem.id} 
                       packageItem={packageItem}
                      />)
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

export default IndexPackageDisplayComponent
