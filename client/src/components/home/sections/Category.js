import React from "react"
import { Container } from "reactstrap"
import CategoryTabs from "./CategoryTabs"

const CategorySection = () => {
    return (
    <>
    <div id="category" className="categorySection">
        <Container fluid className="category-container">
        <h2 className="text-center site-section-heading">Browse our Categories</h2>   
        <p className="description text-center para-style">Find Great discounts from the Leading and best brands in Nigeria's Telecommunication, Internet Service Providers and Decoder TV subscription Plans.</p>
        <CategoryTabs />
        </Container>
    </div>
    </>
    )
}

export default CategorySection