import React from 'react'
import { gql, useMutation } from '@apollo/client'
import { Modal, ModalBody,
     ModalFooter, ModalHeader,
     Button
    } from 'reactstrap'
import { useAlert } from 'react-alert'   
import { withRouter } from 'react-router-dom' 

const DELETE_PACKAGE_MUTATION = gql`
    mutation($idOfPackageToBeDeleted: ID!){
        deletePackage(idOfPackageToBeDeleted: $idOfPackageToBeDeleted){
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

const DeletePackageModalConfirmation = ({
    deleteModalOpen,
    toggleDeleteModalOpen,
    packageId,
    history
}) => {

    const alert = useAlert()
    const [ deletePackage, { loading } ] = useMutation(DELETE_PACKAGE_MUTATION, {
        variables: {
          idOfPackageToBeDeleted: packageId
        },
        onError: (error) => {
            alert.show(error.message, {
                type:'error'
            })
        },
        onCompleted: () => {
            alert.show('Package Deleted Successfully.', {
                type:'success'
            })
            history.push('/admin/packages')
        }
    })

    return <>
        <Modal
         isOpen={deleteModalOpen}
         toggle={toggleDeleteModalOpen}
         centered
        >
            <ModalHeader>Delete Package.</ModalHeader>
            <ModalBody>
                <p className="text-center">Are you sure you want to delete this package and all it's plans ?</p>
            </ModalBody>
            <ModalFooter>
                <Button color='primary' onClick={toggleDeleteModalOpen} outline className="pl-5 pr-5">Cancel</Button>
                <Button color='primary' onClick={deletePackage} className="pl-5 pr-5">
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
                        Delete Package
                    </span>
                        </>
                    }
                </Button>
            </ModalFooter>
        </Modal>
    </>
}

export default withRouter(DeletePackageModalConfirmation)
