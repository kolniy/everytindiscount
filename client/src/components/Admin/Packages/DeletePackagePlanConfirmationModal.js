import React from 'react'
import { Modal, ModalBody,
     ModalFooter, ModalHeader,
    Button
    } from 'reactstrap'

const DeletePackagePlanConfirmationModal = ({
    modalOpen,
    toggleModalOpen,
    handleDeletePlan
}) => {

    const deletePlan = () => {
        handleDeletePlan()
        toggleModalOpen()
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
            <Button color='primary' onClick={deletePlan} className="pl-5 pr-5">Delete Plan</Button>
            </ModalFooter>
        </Modal>
    </>
}

export default DeletePackagePlanConfirmationModal
