import React, { useState, useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'
import { Modal, Card,
     CardHeader, CardBody,
     Form, FormGroup,
     Label, Input,
     Button
    } from 'reactstrap'
import { useAlert } from 'react-alert'

const UPDATE_PACKAGE_PLAN_MUTATION = gql`
    mutation($idOfPackagePlanToUpdated: ID!, $updatePlanData: updatePackagePlanInput){
        updatePackagePlan(idOfPackagePlanToUpdated: $idOfPackagePlanToUpdated, data: $updatePlanData){
            id
            planname
            planprice
            plandescription
        }
    }
`
    
const UpdatePackagePlanModal = ({
    displayModal,
    toggleModal,
    planDetails
}) => {

    const [ packagePlanData, setPackagePlanData ] = useState({
        planname:"",
        planprice:"",
        plandescription:""
    })
    const alert = useAlert()

    const [ updatePackagePlan, { loading, error } ] = useMutation(UPDATE_PACKAGE_PLAN_MUTATION, {
        variables: {
            idOfPackagePlanToUpdated: planDetails.id,
            updatePlanData: {
                planname: packagePlanData.planname,
                planprice: parseInt(packagePlanData.planprice),
                plandescription: packagePlanData.plandescription
            }
        }, 
        onError: (error) => {
            alert.show(error.message, {
                type: 'error'
            })
        }, 
        onCompleted: () => {
            alert.show('Plan Updated Successfully', {
                type:'success'
            })
            toggleModal()
        }
    })

    const updatePackagePlanDataHandler = (e) => setPackagePlanData({
        ...packagePlanData,
        [e.target.name]: e.target.value
    })

    const handleFormSubmit = (e) => {
        e.preventDefault()
        updatePackagePlan()
    }

    console.log(JSON.stringify(error))

    useEffect(() => {
        setPackagePlanData({
            planname: planDetails.planname,
            planprice: planDetails.planprice,
            plandescription: planDetails.plandescription
        })
        // eslint-disable-next-line
    }, [])

    return <>
        <Modal
            isOpen={displayModal}
            toggle={toggleModal}
            size='md'
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
                    }} className="action-title">Update Package Plan</h3>
                    <div onClick={toggleModal} className="close-modal-btn">X</div>
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
                                    Update
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

export default UpdatePackagePlanModal
