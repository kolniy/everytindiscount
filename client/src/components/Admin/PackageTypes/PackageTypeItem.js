import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { Col, Modal, ModalBody,
     ModalFooter, ModalHeader,
     Button
     } from 'reactstrap'
import { useAlert } from 'react-alert'
import { GET_PACKAGE_TYPES } from './PackageTypePage'

const DELETE_PACKAGE_TYPE_BY_ID = gql`
    mutation($packageTypeId: ID!){
    deletePackageType(id: $packageTypeId){
        id
        name
        iconname
      }
    }
`

const PackageTypeItem = ({ packagetype: {
    name,
    iconname,
    id
} }) => {

    const alert = useAlert()
    const [ showDeleteConfirmationModal, setShowDeleteConfirmationModal ] = useState(false)

    const toggleDeleteConfirmationModal = () => setShowDeleteConfirmationModal(!showDeleteConfirmationModal)

    const [ deletePackageType, { loading } ] = useMutation(DELETE_PACKAGE_TYPE_BY_ID, {
        variables: {
            packageTypeId: id
        },
        onCompleted: () => {
            toggleDeleteConfirmationModal()
        },
        onError: (error) => {
            alert.show(error.message, {
                type:'error'
            })
        }, 
        update: (cache, { data: { deletePackageType } }) => {
            const { packagetypes } = cache.readQuery({
                query: GET_PACKAGE_TYPES
            })

            const newpackagetype = packagetypes.filter((packagetype) => {
                return packagetype.id !== deletePackageType.id
            })

           cache.writeQuery({
               query: GET_PACKAGE_TYPES,
               data: {
                   packagetypes: newpackagetype
               }
           })

        }
    })

    const handlePackageTypeDelete = () => {
        deletePackageType()
    }

    return <>
         <Col lg="3" md="6">
        <div
        className="btn-icon-clipboard"
        id="tooltip982655500"
        type="button"
        >
             <div 
            onClick={toggleDeleteConfirmationModal}
             style={{
                 textAlign:'right',
                 width:'100%',
                 display:'flex',
                 justifyContent:'right',
                 cursor:'pointer'
                 }}>
                     <span style={{fontWeight:'700', fontSize:'17px'}}>x</span>
                 </div>
        <div>
            <i className={`${iconname}`} />
            <span>{name}</span>
        </div>
        </div>
    </Col>
    
    {/* delete confirmation modal  */}
    <Modal
         isOpen={showDeleteConfirmationModal}
         toggle={toggleDeleteConfirmationModal}
         size="md"
         centered
        >
            <ModalHeader>
               <h6>Delete Package Type</h6>
            </ModalHeader>
            <ModalBody>
                <p style={{fontSize:'17px'}} className="lead text-center">
                    Are you sure you want to delete this package type ?
                </p>
            </ModalBody>
            <ModalFooter>
                 <Button className="pl-5 pr-5" color='primary' outline onClick={toggleDeleteConfirmationModal}>Cancel</Button>
                 <Button
                  className="pl-5 pr-5"
                  color='primary'
                  disabled={loading}
                  onClick={handlePackageTypeDelete}>
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
                                Confirm
                            </span>
                                </>
                            }
                     </Button>
            </ModalFooter>
        </Modal>
    </>
}

export default PackageTypeItem
