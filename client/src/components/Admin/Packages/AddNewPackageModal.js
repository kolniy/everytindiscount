import React, { useEffect, useState } from 'react'
import { Modal,
    Card,
   CardHeader,
   CardBody,
   Form, FormGroup,
  Input, Button
} from 'reactstrap'

const AddNewPackageModal = ({
    showAddNewPackageModal,
    toggleShowAddNewPackageModal,
    activePackageTypeId
}) => {

    const [ packageFormData, setPackageFormData ] = useState({
        packagetypeId: "",
        packagename:"",
        packagelogo:"",
        packageimage:"",
        packagedescription:"",
        packagediscountpercard:"",
        packagelandingpageimage:"",
        packagediscountperbanktransfer:""
    })

    const updatePackageData = (e) => setPackageFormData({
        ...packageFormData,
        [e.target.name]: e.target.value
    })

    const handleFormSubmit = (e) => {
        e.preventDefault()
        console.log(packageFormData, 'form data')
    }

    useEffect(() => {  // useEffect used to keep track of changes to active package id
        setPackageFormData({
            ...packageFormData,
            packagetypeId: activePackageTypeId
        })
    // eslint-disable-next-line
    }, [activePackageTypeId])

    return <>
        <Modal
         isOpen={showAddNewPackageModal}
         toggle={toggleShowAddNewPackageModal}
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
                    }} className="action-title">Add New Package</h3>
                    <div onClick={toggleShowAddNewPackageModal} className="close-modal-btn">X</div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <Form role="form" onSubmit={e => handleFormSubmit(e)}>
                        <FormGroup>
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
                            <Input
                             placeholder="Package Landing Page Image"
                              type="text"
                              name="packagelandingpageimage"
                              required
                              value={packageFormData.packagelandingpageimage}
                              onChange={e => updatePackageData(e)}
                              />
                        </FormGroup>
                        <FormGroup>
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
                        <div className="text-center">
                            <Button
                              className="btn-icon mt-4"
                              block
                              color="primary"
                              type="submit"
                            //   disabled={loading}
                                >
                                {/* {
                                 loading ? <>
                                <span className="btn-inner--icon">
                                <i className="fas fa-circle-notch fa-spin"></i>
                                </span>
                                <span className="nav-link-inner--text ml-1">
                                    Loading
                                </span>
                                 </> : <>
                                <span className="btn-inner--icon">
                                <i className="ni ni-single-02"></i>
                                </span>
                                <span className="nav-link-inner--text ml-1">
                                   Add Package
                                </span>
                                 </>
                                } */}
                                  Add Package
                            </Button>
                        </div>
                      </Form>
                  </CardBody>
                </Card>
        </Modal>
    </>
}

export default AddNewPackageModal
