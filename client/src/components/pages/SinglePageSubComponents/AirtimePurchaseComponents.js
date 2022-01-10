import React, { useState, useEffect } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import PaystackPop from "@paystack/inline-js"
import { useAlert } from 'react-alert'
import { Container, Card,
     Row, Col, 
     Input, Label, 
     FormGroup, Button } from 'reactstrap'
     
import CurrencyFormat from 'react-currency-format'
import calculateDiscountPerCardPayment from '../../../utilities/calculateDiscountPerCardPayment'
import calculateDiscountPerBankTransfer from '../../../utilities/calculateDiscountPerBankTransfer'

import paystackimage1 from "../../../images/paystack-ii.png"
import TransactionLoadingModal from '../TransactionLoadingModal'
import TransactionSuccessModal from '../TransactionSuccessModal'

const GET_USER_AUTH_STATE = gql`
     query {
       Auth @client
 }
`   
const CREATE_TRANSACTION = gql`
    mutation($createMutationData: createTransactionInput!){
        createTransaction(data: $createMutationData){
            id
            reference
            amount
            paymentmethod
            valuerecipient
            paymentreference
      }
    }
`

const AirtimePurchaseComponents = ({ singlePackage, setOpenAuthModal }) => {

    const { data } = useQuery(GET_USER_AUTH_STATE)
    const alert = useAlert()

    const [ phoneNumber, setPhoneNumber ] = useState('')
    const [ rechargeAmount, setRechargeAmount ] = useState('')
    const [ billingEmail, setBillingEmail ] = useState('')
    const [ paymentMethod, setPaymentMethod ] = useState("dcc")

    const [ paymentToPaystack, setPaymentToPaystack ] = useState(0)
    const [ transactionSuccessModal, setTransactionSuccessModal ] = useState(false)

    const toggleSuccessModal = () => setTransactionSuccessModal(!transactionSuccessModal)

    const updatePhoneNumber = (e) => {
        const number = e.target.value
        if(!number || number.match(/^\d{1,}(\.\d{0,2})?$/)){
            setPhoneNumber(e.target.value)
        }
    }

    const updateRechargeAmount = (e) => {
        const amount = e.target.value
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){
            setRechargeAmount(e.target.value)
        }
    }

    const [ createTransaction, { loading: transactionLoading }  ] = useMutation(CREATE_TRANSACTION, {
        onCompleted: () => {
            toggleSuccessModal()
        },
        onError: (error) => {
            alert.show(error.message)
        }
    })

    const updateBillingEmail = (e) => {
        setBillingEmail(e.target.value)
    }

    const updatePaymentMethod = (e) => {
        setPaymentMethod(e.target.value)
    }

    const handlePayment = () => {
        if(data.Auth.isAuthenticated === false && data.Auth.user === null){
            return setOpenAuthModal(true)
        }
        
        if(paymentMethod === "dcc"){
            // handle payment by credit card
            const payStack = new PaystackPop()
            payStack.newTransaction({
                key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
                email: data.Auth.user.email,
                amount: paymentToPaystack * 100,
                currency:'NGN',
                // channels: ['card'],
                onSuccess: (transaction) => {
                    createTransaction({
                        variables: {
                            createMutationData: {
                              reference: transaction.reference,
                              amount: paymentToPaystack,
                              userid: data.Auth.user.id,
                              paymentmethod: paymentMethod,
                              valuerecipient: phoneNumber
                            }
                          }
                    })
                    setPhoneNumber('')
                    setRechargeAmount('')
                },
                onCancel: () => {
                    alert.show('Are you sure you want to do that!!')
                }
            })
        } else {
            alert.show('Are you sure you want to do that!!')
        }
    }

    useEffect(() => {
        if(rechargeAmount.length > 0){
            paymentMethod === "dcc" ?
             setPaymentToPaystack(calculateDiscountPerCardPayment(singlePackage.packagediscountpercard, rechargeAmount)) : 
            setPaymentToPaystack(calculateDiscountPerBankTransfer(singlePackage.packagediscountperbanktransfer, rechargeAmount))
        }
    // eslint-disable-next-line 
    }, [paymentMethod, rechargeAmount])

    useEffect(() => {
        if(data.Auth.user !== null){
            setBillingEmail(data.Auth.user.email)
        } else {
            setBillingEmail('')
        }
    }, [data])

    return <>
       <Container 
       className="package-action__container"
       fluid style={{
                width:'88%'
            }}>
            <Row className="mb-3">
                <Col xs="12" sm="12" md="6">
                    <FormGroup className="package-action__form-group">
                        <Label>Phone Number</Label>
                        <Input 
                         name="phone"
                         type="tel"
                         placeholder="08012345678"
                         value={phoneNumber}
                         onChange={e => updatePhoneNumber(e)}
                        />
                       {
                           phoneNumber.length > 0 && <>
                                 {
                              (phoneNumber.length < 11 || phoneNumber.length > 11) && (
                                <p className="validation-error-text">invalid phone number type</p>
                                    )
                                }
                           </>
                       }
                    </FormGroup>
                    <FormGroup className="package-action__form-group">
                       <Label>Recharge Amount</Label>
                        <Input 
                         type="text"
                         name="amount"
                         placeholder="500"
                         value={rechargeAmount}
                         onChange={e => updateRechargeAmount(e)}
                        />
                       {
                           rechargeAmount.length > 0 && <>
                             {
                            (parseInt(rechargeAmount) === 0 || rechargeAmount.length === 0) && (
                                <p className="validation-error-text">invalid recharge amount</p>
                            )
                        }
                           </>
                       }
                    </FormGroup>
                    <FormGroup className="package-action__form-group">
                        <Label>Billing Email</Label>
                        <Input 
                         name="billingemail"
                         placeholder="jondoe@gmail.com"
                         value={billingEmail}
                         onChange={e => updateBillingEmail(e)}
                        />
                    </FormGroup>
                </Col>
                <Col xs="12" sm="12" md="6">
                <Card className="package-action_payment-cta">
                    <h2 className="call-to-action__text">
                        Buy A {`${singlePackage.packagename}`} Airtime
                    </h2>
                    <div className="recipient-details_and_amount">
                        <div className="amount-info">
                            <p className="paragraph-info">Amount:</p>
                            <h3 className="cost-header">
                                {
                                rechargeAmount.length !== 0 ? <>
                                   {
                                       paymentMethod === 'dcc' ? <>
                                        &#8358;
                                        <CurrencyFormat 
                                            value={calculateDiscountPerCardPayment(singlePackage.packagediscountperbanktransfer, rechargeAmount)}
                                            displayType='text'
                                            thousandSeparator={true}
                                            fixedDecimalScale={true}
                                            decimalScale={2}
                                        />
                                       </> : <>
                                        &#8358;
                                       <CurrencyFormat 
                                            value= {calculateDiscountPerBankTransfer(singlePackage.packagediscountperbanktransfer, rechargeAmount)}
                                            displayType='text'
                                            thousandSeparator={true}
                                            fixedDecimalScale={true}
                                            decimalScale={2}
                                        />
                                       </>
                                   }
                               </> : (<p style={{
                                   color:'#000',
                                   fontSize:'13px'
                                        }} 
                               className="small">amount not specified</p>)
                            }</h3>
                        </div>
                        <div className="recipient-info">
                            <p className="paragraph-info">To:</p>
                            <p className="recharge-number">{
                                phoneNumber.length !== 0 ?
                                 <>
                                    {phoneNumber}
                                 </> : <>{<small>number not specified</small>}</>
                            }</p>
                        </div>
                    </div>

                    <div className="payment-method mt-3">
                      <p className="paragraph-info">Select Payment Type:</p>
                      <div className="payment-method__checkbox mt-2">
                      <div className="custom-control custom-control-alternative custom-radio mb-3">
                            <input
                                className="custom-control-input"
                                id="customRadio1"
                                name="paymentmethod"
                                type="radio"
                                checked={paymentMethod === "dcc"}
                                value="dcc"
                                onChange={e => updatePaymentMethod(e)}
                            />
                            <label className="custom-control-label" htmlFor="customRadio1">
                                Debit/Credit Card
                            </label>
                            </div>
                            <div className="custom-control custom-control-alternative custom-radio mb-3">
                            <input
                                className="custom-control-input"
                                id="customRadio2"
                                name="paymentmethod"
                                type="radio"
                                checked={paymentMethod === "bt"}
                                value="bt"
                                onChange={e => updatePaymentMethod(e)}
                            />
                            <label className="custom-control-label" htmlFor="customRadio2">
                                Bank Transfer
                            </label>
                            </div>
                      </div>
                    </div>

                    <div className="payment-method__btn mt-3 mb-3">
                        <Button
                         disabled={
                            (phoneNumber.length < 11 || phoneNumber.length > 11) ||
                            (parseInt(rechargeAmount) === 0 || rechargeAmount.length === 0)
                         }
                         block
                         onClick={handlePayment}
                         color="primary">Pay Now</Button>
                    </div>
                   <div className="secure-payments-image-container">
                       <img src={paystackimage1} alt="..." className="img-fluid" />
                   </div>
                </Card>
                </Col>
            </Row>
       </Container>
       <TransactionLoadingModal isOpen={transactionLoading} />
       <TransactionSuccessModal user={data.Auth.user} isOpen={transactionSuccessModal} 
        toggleSuccessModal={toggleSuccessModal} />
    </>
}

export default AirtimePurchaseComponents
