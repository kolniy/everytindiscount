import React from 'react'
import { Modal, Card,
    CardBody, Button
} from 'reactstrap'
import { withRouter } from 'react-router-dom'

const TransactionSuccessModal = ({
    isOpen,
    user,
    toggleSuccessModal,
    history
}) => {

    const handleContinuePurchaseClick = () => {
        toggleSuccessModal()
    }

    const handleGoToDashboard = () => {
        if(user.role === 'admin'){
            history.push('/admin/user/transactions')
        } else {
            history.push('/user/transaction')
        }
    }

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
                        <i style={{fontSize:'70px', color:'#00ab66'}} className="far fa-check-circle"></i>
                       </div>
                       <p style={{fontSize:'17px'}} className="text-center">
                           Your Transaction was Processed Successfully!
                       </p>

                       <hr />
                            <Button 
                            className="mb-1"
                            onClick={handleContinuePurchaseClick}
                            outline 
                            color="primary"
                            block>Continue Purchase</Button>
                            
                            <Button
                            onClick={handleGoToDashboard}
                             color="primary" 
                             block>Go to Dashboard</Button>
                   </div>
                </CardBody>
            </Card>
            </div>
        </Modal>
    </>
}

export default withRouter(TransactionSuccessModal)