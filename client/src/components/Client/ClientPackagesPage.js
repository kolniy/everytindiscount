import React, { useState } from 'react'
import { Container, Row,
   Card, CardHeader, 
   CardBody, InputGroup,
   InputGroupText, InputGroupAddon,
  Input
  } from 'reactstrap'
import ClientVerticalNavbar from './ClientVerticalNavbar'
import ClientNavbar from './ClientNavbar'
import ClientWelcomeMessage from './ClientWelcomeMessage'
import IndexPageCategoryTabs from './IndexPageCategoryTabs'

const ClientPackagesPage = () => {

    const [ searchQuery, setSearchQuery ] = useState("")
    const updateSearchQuery = (e) => setSearchQuery(e.target.value)


  return <>
    <ClientVerticalNavbar />
    <div className="main-content">
        <ClientNavbar />
        <ClientWelcomeMessage />

        <Container className="mt--7" fluid>
            <Row>
               <div className='col'>
                 <Card className='shadow'>
                 <CardHeader className="bg-transparent package-type-header">
                    <h3 style={{
                      fontSize:'17px',
                      fontWeight:'600'
                    }}>Packages</h3>

                <InputGroup style={{
                  width: '40%'
                }}>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-zoom-split-in" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                   placeholder="Search Packages"
                   value={searchQuery}
                   onChange={updateSearchQuery}
                   type="text"
                    />
                </InputGroup>
                 </CardHeader>
                 <CardBody className="package-body">
                 <div className="package-category-container">
                  <IndexPageCategoryTabs
                      searchQuery={searchQuery}
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

export default ClientPackagesPage
