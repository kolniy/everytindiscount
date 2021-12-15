import React from 'react'
import { Card, 
    CardHeader,
     Table
    } from 'reactstrap'
import PackagePlanItem from './PackagePlanItem'    

const PackagePlansContainer = ({
    packagePlans,
    packageLogo,
    toggleAddNewPackagePlan
}) => {
    return <>
          <div className="package-plans-container mt-4">
                <Card className="shadow">
                    <CardHeader className="border-0 package-plan-table-header">
                      <h3 className="mb-0 package-plan-table-title">Package Plans</h3>

                      <div onClick={toggleAddNewPackagePlan} className="addplan-type-icon">
                                <i className="fas fa-plus"></i>
                            </div>
                    </CardHeader>
                        <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                            <tr>
                            <th scope="col">Plan Name</th>
                            <th scope="col">Plan Price</th>
                            <th scope="col">Plan Description</th>
                            <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                              packagePlans.length === 0 ? <>
                                <tr>
                                <p style={{display:'flex', justifyContent:'center', alignItems:'center'}} className="text-center pt-3 pb-3">No Package plans Found!</p>
                              </tr>
                              </> : <>
                                {
                                    packagePlans.map((planItem) =>
                                    <PackagePlanItem 
                                    key={planItem.id}
                                     packagePlanItem={planItem}
                                     packageLogo={packageLogo}
                                     />)
                                }
                              </>
                            }
                      </tbody>
                    </Table>
                </Card>
          </div>
    </>
}

export default PackagePlansContainer
