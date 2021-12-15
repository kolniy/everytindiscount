import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useAlert } from 'react-alert'
import { Modal,
    Card,
   CardHeader,
   CardBody,
   Form, FormGroup,
  Input, Button,
  Label
} from 'reactstrap'
import { SINGLE_PACKAGE_QUERY } from './AdminSinglePackageItemPage'

const CREATE_NEW_PACKAGE_PLAN = gql`
    mutation($createPackagePlanData: createPackagePlanInput!){
        createPackagePlan(data: $createPackagePlanData){
            id
            planname
            plandescription
            planprice
            createdat
         }
    }
`

const AddNewPackagePlanModal = ({
    displayNewPackagePlanModal,
    toggleDisplayNewPackagePlanModal,
    packageId
}) => {

    const alert = useAlert()
    const [ packagePlanData, setPackagePlanData ] = useState({
        planname:"",
        planprice:"",
        plandescription:""
    })

    const [ createPackagePlan, { loading } ] = useMutation(CREATE_NEW_PACKAGE_PLAN, {
        variables: {
            createPackagePlanData: {
                idOfPackageToSaveTo: packageId,
                planname: packagePlanData.planname,
                planprice: parseInt(packagePlanData.planprice),
                plandescription: packagePlanData.plandescription
            }
        },
        onError: (error) => {
            alert.show(error.message, {
                type:'error'
            })
        },
        onCompleted: () => {
            alert.show("Plan Added Successfully!")
            toggleDisplayNewPackagePlanModal()
            setPackagePlanData({
                planname:"",
                plandescription:"",
                planprice:""
            })
        },
        update(cache, { data: { createPackagePlan }}){

            const { singlePackage } = cache.readQuery({
                query: SINGLE_PACKAGE_QUERY,
                variables: {
                    packageId: packageId
                }
            })

            cache.writeQuery({
                query: SINGLE_PACKAGE_QUERY,
                variables: {
                    packageId: packageId
                },
                data: {
                    singlePackage: {
                        ...singlePackage,
                        packageplan: [...singlePackage.packageplan, createPackagePlan]
                    }
                }
            })
        }
    })

    const updatePackagePlanDataHandler = (e) => setPackagePlanData({
        ...packagePlanData,
        [e.target.name]: e.target.value
    })

    const handleFormSubmit = (e) => {
        e.preventDefault()
        createPackagePlan()
    }

    return <>
        <Modal
         isOpen={displayNewPackagePlanModal}
         toggle={toggleDisplayNewPackagePlanModal}
         size="md"
         centered
        >
             <Card className="bg-secondary shadow border-0">
                  <CardHeader style={{
                      display:'flex',
                      justifyContent:'space-between',
                      alignItems:'baseline'
                  }} className="bg-transparent pb-2">
                    <h3 style={{
                        fontSize:'16px',
                        fontWeight:'bold'
                    }} className="action-title">Add New Package Plan</h3>
                    <div onClick={toggleDisplayNewPackagePlanModal} className="close-modal-btn">X</div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <Form role="form" onSubmit={e => handleFormSubmit(e)}>
                        <FormGroup>
                            <Label>Plan Name</Label>
                            <Input 
                            placeholder="Plan Name" 
                            type="text"
                            name="planname"
                            value={packagePlanData.planname}
                            onChange={e => updatePackagePlanDataHandler(e)}
                            required
                             />
                        </FormGroup>
                        <FormGroup>
                            <Label>Plan Price</Label>
                            <Input
                             placeholder="Plan Price"
                              type="text"
                              name="planprice"
                              value={packagePlanData.planprice}
                              onChange={e => updatePackagePlanDataHandler(e)}
                              required
                              />
                        </FormGroup>
                        <FormGroup>
                            <Label>Plan Description</Label>
                            <Input
                             placeholder="Plan Description"
                              type="textarea"
                              name="plandescription"
                              value={packagePlanData.plandescription}
                              onChange={e => updatePackagePlanDataHandler(e)}
                              rows={3}
                              required
                              />
                        </FormGroup>
                        <div className="text-center">
                            <Button
                              className="btn-icon mt-4"
                              block
                              color="primary"
                              type="submit"
                              disabled={loading}
                                >
                                    {
                                        loading ? <>
                                        <span className="btn-inner--icon">
                                        <i className="fas fa-circle-notch fa-spin"></i>
                                        </span>
                                        <span className="nav-link-inner--text ml-1">
                                            Loading
                                        </span>
                                        </> : <>
                                        <span className="nav-link-inner--text ml-1">
                                            Add New Package Plan
                                        </span>
                                        </>
                                    }
                            </Button>
                        </div>
                      </Form>
                  </CardBody>
                </Card>
        </Modal>
    </>
}

export default AddNewPackagePlanModal
