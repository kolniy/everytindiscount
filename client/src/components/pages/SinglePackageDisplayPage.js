import React from 'react'
import { gql, useQuery } from '@apollo/client'
import {
    Card,
    Container,
  } from "reactstrap";
import PagesNavbar from './PagesNavbar'
import Footer from '../Layout/Footer';
import AirtimePurchaseComponents from './SinglePageSubComponents/AirtimePurchaseComponents';
import DecoderSubscriptionComponents from './SinglePageSubComponents/DecoderSubscriptionComponents';
import DataPurchaseComponents from './SinglePageSubComponents/DataPurchaseComponents';
import MovieTicketsComponent from './SinglePageSubComponents/MovieTicketsComponent';

const SINGLE_PACKAGE_QUERY = gql`
    query ($packageId: ID!){
    singlePackage(packageId: $packageId) {
    id
    packagetype {
      name
    }
    packagename
    packageimage
    packagelandingpageimage
    packagediscount
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

const SinglePackageDisplayPage = ({ match }) => {

    const { data, error, loading } = useQuery(SINGLE_PACKAGE_QUERY, {
        variables: {
            packageId: match.params.packageid
        }
    })
   
    if(error){
       return <p className="text-center">Error: {error}</p>
    }

    const determineComponentToRender = (packageType) => {
        if(packageType.toLowerCase().includes('airtime topup')){
            return <AirtimePurchaseComponents singlePackage={data.singlePackage} />
        } else if(packageType.toLowerCase().includes('decoder subscription')){
            return <DecoderSubscriptionComponents singlePackage={data.singlePackage} />
        } else if(packageType.toLowerCase().includes('data plans')){
            return <DataPurchaseComponents singlePackage={data.singlePackage} />
        } else if(packageType.toLowerCase().includes('movie tickets')){
            return <MovieTicketsComponent singlePackage={data.singlePackage} />
        }
    }

    return <>
        <PagesNavbar />
<section className="register section section-shaped full-width">
 <div className="shape shape-style-1 section-background">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
       </div>
            {
                loading ? <>
                    <div style={{
                  width:'50%',
                  margin:'20px auto',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center'
              }}>
               <i style={{fontSize:'22px'}} className="fas fa-circle-notch fa-spin"></i></div>
                </> : <>
                <Container fluid style={{
                    width:'90%'
                }}>
                    <Card className="bg-secondary border-0 single-package__page-container">
                            <div className="package__langing-page-imagecontainer">
                                <img src={data.singlePackage.packagelandingpageimage} alt="package biller logo" />
                            </div>
                    </Card>
                </Container>
                {
                  determineComponentToRender(data.singlePackage.packagetype.name)
                }
                </>
            }
          </section>
          <Footer />
    </>
}

export default SinglePackageDisplayPage