import React, { useState, useEffect } from "react"
import { useQuery, gql } from "@apollo/client"
import { 
    Nav,
     } from "reactstrap"
import Navitem from "./Navitem"
import PackageDisplayComponent from "./PackageDisplayComponent"


const getPackagesTypes = gql`
  query {
  packagetypes {
    id
    name
    iconname
    createdat
  }
}
`

const CategoryTabs = () => {

    const { data, error, loading } = useQuery(getPackagesTypes)
    const [ activeTabId, setActiveTabId ] = useState(null)
   
    useEffect(() => {
      if(data){
        setActiveTabId(data?.packagetypes[0]?.id) // sets the id variable to the id of the first package type ID
      }
    }, [data, setActiveTabId])

    const updateActiveTab = (tabId) => {
      setActiveTabId(tabId)
    }

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
      return <div>Error: {error}</div>
    }

    return <>
    <div className="nav-wrapper mb-2">
              <Nav
                className="nav-fill flex-column flex-md-row"
                id="tabs-icons-text"
                pills
                role="tablist"
              >
              {
                  data.packagetypes.map((packagetype) => 
                  <Navitem key={packagetype.id} 
                  activeTabId={activeTabId}
                  packageTypeDetails={packagetype}
                  updateActiveTab={updateActiveTab}
                   />)
              }
              </Nav>
            </div>
              {
                 activeTabId === null ? (<div style={{
                  width:'50%',
                  margin:'20px auto',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center'
              }}>
               <i style={{fontSize:'22px'}} className="fas fa-circle-notch fa-spin"></i></div>) :
                 <PackageDisplayComponent activeTabId={activeTabId} />
              }
            </>
}

export default CategoryTabs