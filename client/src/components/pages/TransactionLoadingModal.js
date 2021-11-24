import React from 'react'
import { Modal, Card,
    CardBody
} from 'reactstrap'


const TransactionLoadingModal = ({
    isOpen
}) => {

    return <>
    <Modal
            className="modal-dialog-centered"
            size="sm"
            isOpen={isOpen}
          >
        <div className="auth-modal-contents modal-body p-0">
            <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-5">
                   <div style={{
                       display:'flex',
                       flexDirection:'column',
                       justifyContent:'center',
                       alignContent:'center'
                   }} className="loading-contents-container">
                       <div className="text-center mt-3 mb-4">
                        <i style={{fontSize:'50px'}} className="fas fa-spinner fa-spin"></i>
                       </div>
                       <p style={{fontSize:'18px'}} className="text-center">
                           Processing Transaction...
                       </p>
                   </div>
                </CardBody>
            </Card>
            </div>
        </Modal>
    </>
}

export default TransactionLoadingModal