import React, { useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Modal,
    Card,
   CardHeader,
   CardBody,
   Form, FormGroup,
  Input, Button,
  Label
} from 'reactstrap'
import { useAlert } from 'react-alert'
import { getPackagesFromPackageTypeId } from './PackageList'

const PACKAGE_CREATION_MUTATION = gql`
    mutation($createPackageData: createPackageInput!){
        createPackage(data: $createPackageData){
        id
        packagename
        packagelogo
        packagelandingpageimage
        packageimage
        packagedescription
        }
    }
`

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

    const alert = useAlert()

    const [ createPackage, { loading } ] = useMutation(PACKAGE_CREATION_MUTATION, {
        variables:{
            createPackageData: {
              packagetypeId: packageFormData.packagetypeId,
              packagename: packageFormData.packagename,
              packagelogo: packageFormData.packagelogo,
              packageimage: packageFormData.packageimage,
              packagedescription: packageFormData.packagedescription,
              packagediscountpercard: packageFormData.packagediscountpercard,
              packagediscountperbanktransfer: packageFormData.packagediscountperbanktransfer,
              packagelandingpageimage: packageFormData.packagelandingpageimage
            }
        },
        onError: (error) => {
            alert.show(error.message, {
                type:'error'
            })
          },
        onCompleted: () => {
            setPackageFormData({
                ...packageFormData,
                packagename:"",
                packagelogo:"",
                packageimage:"",
                packagedescription:"",
                packagediscountpercard:"",
                packagelandingpageimage:"",
                packagediscountperbanktransfer:""
            })

            toggleShowAddNewPackageModal()

            alert.show('Package Created Successfully', {
                type:'success'
            })
        },
        update(cache, { data: { createPackage } }){

            const { packages } = cache.readQuery({
                query: getPackagesFromPackageTypeId,
                variables: {
                    packageTypeId: activePackageTypeId
                }
            })

            cache.writeQuery({
                query: getPackagesFromPackageTypeId,
                variables: {
                    packageTypeId: activePackageTypeId
                },
                data: {
                    packages: [ ...packages, createPackage ]
                }
            })
        } 
    })

    const updatePackageData = (e) => setPackageFormData({
        ...packageFormData,
        [e.target.name]: e.target.value
    })

    const handleFormSubmit = (e) => {
        e.preventDefault()
        // console.log(packageFormData, 'form data')
        createPackage()
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
                            <Label>Package Landing Page Image</Label>
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
                                <span className="btn-inner--icon">
                                <i className="ni ni-single-02"></i>
                                </span>
                                <span className="nav-link-inner--text ml-1">
                                   Add Package
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

export default AddNewPackageModal
