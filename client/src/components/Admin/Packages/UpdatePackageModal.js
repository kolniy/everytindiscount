import React, { useEffect, useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { Modal,
     Button, Card,
     CardHeader,
     CardBody,
     Form, FormGroup,
    Input,
    Label, ModalFooter
    } from 'reactstrap'
import { useAlert } from 'react-alert'  

const UPDATE_PACKAGE_MUTATION = gql`
  mutation($idOfPackageToBeUpdated: ID!, $updatePackageData: updatePackageInput){
  updatePackage(idOfPackageToBeUpdated:$idOfPackageToBeUpdated, data:$updatePackageData){
    id
    packagetype {
      name
    }
    packagename
    packageimage
    packagelandingpageimage
    packagediscountpercard
    packagediscountperbanktransfer
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

const UpdatePackageModal = ({
    toggleModal,
    displayModal,
    packageData
}) => {

    const [ packageFormData, setPackageFormData ] = useState({
        packagename:"",
        packagelogo:"",
        packageimage:"",
        packagedescription:"",
        packagediscountpercard:"",
        packagediscountperbanktransfer:""
    })

    const alert = useAlert()

    const updatePackageData = (e) => setPackageFormData({
        ...packageFormData,
        [e.target.name]: e.target.value
    })

    const [ updatePackage, { loading } ] = useMutation(UPDATE_PACKAGE_MUTATION, {
        variables: {
            idOfPackageToBeUpdated: packageData.id,
            updatePackageData: {
                packagename: packageFormData.packagename,
                packageimage: packageFormData.packageimage,
                packagediscountpercard: packageFormData.packagediscountpercard,
                packagediscountperbanktransfer: packageFormData.packagediscountperbanktransfer,
                packagedescription: packageFormData.packagedescription,
                packagelogo: packageFormData.packagelogo
            }
        },
        onError: (error) => {
            alert.show(error.message, {
                type:'error'
            })
        },
        onCompleted: () => {
            toggleModal()   

            alert.show('Package Updated Successfully', {
                type:'success'
            })
        }
    })

    const handleUpdateSubmit = (e) => {
        e.preventDefault()
        updatePackage()
    }

    useEffect(() => {
        setPackageFormData({
            packagename: packageData.packagename,
            packagelogo: packageData.packagelogo,
            packageimage: packageData.packageimage,
            packagedescription: packageData.packagedescription,
            packagediscountpercard: packageData.packagediscountpercard,
            packagediscountperbanktransfer: packageData.packagediscountperbanktransfer
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
                    }} className="action-title">Update Package</h3>
                    <div onClick={toggleModal} className="close-modal-btn">X</div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-3">
                    <Form role="form" onSubmit={e => handleUpdateSubmit(e)}>
                        <FormGroup>
                            <Label>Package Name</Label>
                            <Input 
                            placeholder="Package Name" 
                            type="text"
                            name="packagename"
                            value={packageFormData.packagename}
                            onChange={e => updatePackageData(e)}
                            required
                             />
                        </FormGroup>
                        <FormGroup>
                            <Label>Package Logo</Label>
                            <Input
                             placeholder="Package Logo"
                              type="text"
                              name="packagelogo"
                              value={packageFormData.packagelogo}
                              onChange={e => updatePackageData(e)}
                              required
                              />
                        </FormGroup>
                        <FormGroup>
                            <Label>Package Image</Label>
                            <Input
                             placeholder="Package Image"
                              type="text"
                              name="packageimage"
                              value={packageFormData.packageimage}
                              onChange={e => updatePackageData(e)}
                              required
                              />
                        </FormGroup>
                        <FormGroup>
                            <Label>Package Bank Transfer Discount</Label>
                            <Input
                             placeholder="Package Bank Transfer Discount"
                              type="text"
                              name="packagediscountperbanktransfer"
                              value={packageFormData.packagediscountperbanktransfer}
                              onChange={e => updatePackageData(e)}
                              required
                              />
                        </FormGroup>
                        <FormGroup>
                            <Label>Package Card Transaction Discount</Label>
                            <Input
                             placeholder="Package Card Transaction Discount"
                              type="text"
                              name="packagediscountpercard"
                              value={packageFormData.packagediscountpercard}
                              onChange={e => updatePackageData(e)}
                              required
                              />
                        </FormGroup>
                        <FormGroup>
                            <Label>Package Description</Label>
                            <Input
                             placeholder="Package Description"
                              type="textarea"
                              name="packagedescription"
                              value={packageFormData.packagedescription}
                              onChange={e => updatePackageData(e)}
                              rows={3}
                              required
                              />
                        </FormGroup>
                      </Form>
                  </CardBody>
                </Card>
                <ModalFooter>
                    <Button onClick={toggleModal} outline className="pl-5 pr-5" color='primary'>Cancel</Button>
                    <Button
                     color='primary'
                     disabled={loading}
                     onClick={handleUpdateSubmit}
                     className="pl-5 pr-5">
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
                </ModalFooter>
        </Modal>
    </>
}

export default UpdatePackageModal
