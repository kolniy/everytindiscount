import React from 'react'
import { Modal, ModalBody,
     ModalFooter, ModalHeader,
    Button
    } from 'reactstrap'

const DeletePackagePlanConfirmationModal = ({
    modalOpen,
    toggleModalOpen,
    handleDeletePlan,
    operationLoading
}) => {

    const deletePlan = () => {
        handleDeletePlan()
    }

    return <>
        <Modal
        isOpen={modalOpen}
        toggle={toggleModalOpen}
        centered
        >
            <ModalHeader>Delete Package Plan.</ModalHeader>
            <ModalBody>
            <p className="text-center">Are you sure you want to delete this plan ?</p>
            </ModalBody>
            <ModalFooter>
            <Button color='primary' onClick={toggleModalOpen} outline className="pl-5 pr-5">Cancel</Button>
            <Button
             disabled={operationLoading}
             color='primary'
             onClick={deletePlan} 
             className="pl-5 pr-5">
                    {
                        operationLoading ? <>
                        <span className="btn-inner--icon">
                        <i className="fas fa-circle-notch fa-spin"></i>
                        </span>
                        <span className="nav-link-inner--text ml-1">
                            Loading
                        </span>
                        </> : <>
                        <span className="nav-link-inner--text ml-1">
                        Delete
                        </span>
                        </>
                    }
               </Button>
            </ModalFooter>
        </Modal>
    </>
}

export default DeletePackagePlanConfirmationModal
