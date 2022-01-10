import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { Modal, Button,
    FormGroup, Input, Label
} from 'reactstrap'

const PaymentReferenceModal = ({
    isOpen,
    closePaymentReferenceModal,
    paymentReferenceText,
    updatePaymentReferenceText,
    handleSubmitTransactionWithBankTransferReference,
    paymentAmount
}) => {

    const handleClickEvent = () => {
        handleSubmitTransactionWithBankTransferReference()
        closePaymentReferenceModal()
    }

    return <>
        <Modal
            className="modal-dialog-centered"
            size="sm"
            isOpen={isOpen}
          >
            <div className="modal-header">
               <div
               className="payment-reference-header__modal-contents">
                    <h3>Submit Payment Reference</h3>
                    <div className="close-modal__icon" onClick={closePaymentReferenceModal}><i className="fas fa-times"></i></div>
               </div>
            </div>
            <div className="modal-body">
                <FormGroup>
                    <Label>Transfer Instructions!</Label>
                    <p>Transfer the sum of <span style={{
                        color:'tomato',
                        fontWeight:'bold'
                    }}>&#8358;{<CurrencyFormat
                        value={paymentAmount}
                        displayType='text'
                        thousandSeparator={true}
                        fixedDecimalScale={true}
                        decimalScale={2}
                     />}</span> to The Account Details Provided Below..</p>
                    <p>Account Name: <span style={{
                        color:'tomato',
                        fontWeight:'bold'
                    }}>Everytindiscount Global Resources</span></p>
                    <p>Account Number: <span style={{
                        color:'tomato',
                        fontWeight:'bold'
                    }}>2520005010</span></p>
                    <p>Bank Name: <span style={{
                        color:'tomato',
                        fontWeight:'bold'
                    }}>Ecobank Bank</span></p>
                </FormGroup>
                <FormGroup> 
                    <Label>Payment Reference</Label>
                    <Input
                     onChange={e => updatePaymentReferenceText(e)}
                     name='paymentreference'
                     value={paymentReferenceText}
                     placeholder='Payment Reference'></Input>
                </FormGroup>
            </div>
            <div className="modal-footer">
                <Button
                onClick={closePaymentReferenceModal}
                color='primary'
                outline
                block>Cancel</Button>

                <Button 
                 disabled={paymentReferenceText.length === 0}
                 onClick={handleClickEvent}
                 color='primary'
                 block>Submit</Button>
            </div>
    </Modal>
    </>
}

export default PaymentReferenceModal
