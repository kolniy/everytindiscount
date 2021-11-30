import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Modal,
    Card,
   CardHeader,
   CardBody,
   Form, FormGroup,
   InputGroup, InputGroupAddon,
   InputGroupText, Input, Button
} from 'reactstrap'
import { useAlert } from 'react-alert'
import { GET_PACKAGE_TYPES } from './PackageTypePage'

const CREATE_PACKAGE_TYPE = gql`
    mutation($packageTypeData: createPackageTypeInput!) {
        createPackageType(data: $packageTypeData){
            id
            name
            iconname
        }
    }
`

const AddNewPackageTypeModal = ({
    showAddPackageTypeModal,
    toggleAddPackageTypeModal
}) => {

    const [ newPackageTypeData, setNewPackageTypeData ] = useState({
        packagetypename:"",
        iconame:""
    })

    const updatePackageTypeData = (e) => setNewPackageTypeData({
        ...newPackageTypeData,
        [e.target.name]: e.target.value
    })

    const alert = useAlert()

    const [ createPackageType, { loading } ] = useMutation(CREATE_PACKAGE_TYPE, {
        variables: {
            packageTypeData: {
                name: newPackageTypeData.packagetypename,
                iconname: newPackageTypeData.iconame
            }
        },
        onError: (error) => {
            alert.show(error.message, {
                type:'error'
            })
        },
        onCompleted: () => {
          alert.show('Package type added successfully', {
              type:'success'
          })  
          setNewPackageTypeData({
              ...newPackageTypeData,
              packagetypename:"",
              iconame:""
          })
          toggleAddPackageTypeModal()
        },
        update(cache, { data: { createPackageType } }){

            const { packagetypes } = cache.readQuery({
                query: GET_PACKAGE_TYPES
            })

            cache.writeQuery({
                query: GET_PACKAGE_TYPES,
                data: {
                    packagetypes: [...packagetypes, createPackageType]
                }
            })

        }
    })

    const handlePackageTypeSubmit = (e) => {
        e.preventDefault()
        if(newPackageTypeData.packagetypename.length === 0){
            return alert.show('package type name cannot be empty', { type:'error'})
        }
        if(newPackageTypeData.iconame.length === 0){
            return alert.show('package type icon name cannot be empty', { type: 'error'})
        }
        createPackageType()
    }

    return <>
        <Modal
         isOpen={showAddPackageTypeModal}
         toggle={toggleAddPackageTypeModal}
         size="sm"
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
                    }} className="action-title">Add New Package Type</h3>
                    <div onClick={toggleAddPackageTypeModal} className="close-modal-btn">X</div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <Form role="form" onSubmit={e => handlePackageTypeSubmit(e)}>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-hat-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input 
                            placeholder="Package type name" 
                            type="text"
                            name="packagetypename"
                            required
                            value={newPackageTypeData.packagetypename}
                            onChange={e => updatePackageTypeData(e)}
                             />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                             placeholder="Package type icon name"
                              type="text"
                              name="iconame"
                              required
                              value={newPackageTypeData.iconame}
                              onChange={e => updatePackageTypeData(e)}
                              />
                          </InputGroup>
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
                                   Add Package Type
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

export default AddNewPackageTypeModal