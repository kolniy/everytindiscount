import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Card, CardImg, CardBody, Button } from 'reactstrap'

const IndexPackageItem = ({
    packageItem
}) => {
  return <>
    <Col xs="12" sm="6" md="4" xl="3" className="mb-4">
    <Card className="card-lift--hover shadow border-0 category-item">
        <CardBody>
            <div className="card-image-container">
            <CardImg
            src={packageItem.packagelogo}
            alt="biller logo"
            />
            </div>
            <h6 className="text-primary text-uppercase">
                {packageItem.packagename}
            </h6>
            <p title={packageItem.packagedescription} className="description mt-3">
                {packageItem.packagedescription}
            </p>
            <Button
            tag={Link}
            to={`/package/single/${packageItem.id}`}
            className="mt-2"
            color="primary"
            >
            Subscribe
            </Button>
        </CardBody>
        <div className="card-item-primary__img">
            <img src={packageItem.packageimage} alt="secondary for card" />
        </div>
        </Card>
    </Col>
  </>
}

export default IndexPackageItem
