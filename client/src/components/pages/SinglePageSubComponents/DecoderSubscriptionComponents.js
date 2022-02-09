import React, { useState, useEffect } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import PaystackPop from "@paystack/inline-js"
import { useAlert } from 'react-alert'
import { Container, Card, 
        Row, Col, 
        Input, Label,
        FormGroup, Button
} from 'reactstrap'

import CurrencyFormat from 'react-currency-format'
import calculateDiscounPerCardPayment from '../../../utilities/calculateDiscountPerCardPayment'
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

export const DecoderSubscriptionComponents = ({ singlePackage, setOpenAuthModal }) => {

    const [ deviceNumber, setDeviceNumber ] = useState('')
    const [ billingEmail, setBillingEmail ] = useState('')
    const [ paymentMethod, setPaymentMethod ] = useState("dcc")
    const { data } = useQuery(GET_USER_AUTH_STATE)
    const alert = useAlert()
    const [ paymentToPaystack, setPaymentToPaystack ] = useState(0)

    const [ idOfChosePlan, setIdOfChosenPlan ] = useState('')
    const [ chosenPlanObject, setChosenPlanObject ] = useState(null)

    const [ transactionSuccessModal, setTransactionSuccessModal ] = useState(false)
    
    const toggleSuccessModal = () => setTransactionSuccessModal(!transactionSuccessModal)

    const [ createTransaction, { loading: transactionLoading } ] = useMutation(CREATE_TRANSACTION, {
        onCompleted: () => {
          toggleSuccessModal()
        },
        onError: (error) => {
            alert.show(error.message)
        }
    })

    const chosePlan = (e) => {
        setIdOfChosenPlan(e.target.value)
    }

    const updateDeviceNumber = (e) => {
        const number = e.target.value
        if(!number || number.match(/^\d{1,}(\.\d{0,2})?$/)){
            setDeviceNumber(e.target.value)
        }
    }

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
                              planid: idOfChosePlan,
                              reference: transaction.reference,
                              amount: paymentToPaystack,
                              userid: data.Auth.user.id,
                              paymentmethod: paymentMethod,
                              valuerecipient: deviceNumber,
                              vendor: singlePackage.packagename
                            }
                          }
                    })
                    setDeviceNumber('')
                    setIdOfChosenPlan('')   
                },
                onCancel: () => {
                    alert.show('Are you sure you want to do that!!')
                }
            })
        } else {
            // handle payment by bank transfer
            alert.show('payment by card handled here')
        }
    }

    useEffect(() => {
        if(data.Auth.user !== null){
            setBillingEmail(data.Auth.user.email)
        } else {
            setBillingEmail('')
        }
    }, [data])

    useEffect(() => {
        const planObject = singlePackage.packageplan.find((plan) => plan.id === idOfChosePlan)
        setChosenPlanObject(planObject)
        
        // eslint-disable-next-line
    }, [idOfChosePlan])

    useEffect(() => {
        if(chosenPlanObject){
            paymentMethod === 'dcc' ? 
        setPaymentToPaystack(calculateDiscounPerCardPayment(singlePackage.packagediscountpercard, chosenPlanObject?.planprice)) :
        setPaymentToPaystack(calculateDiscountPerBankTransfer(singlePackage.packagediscountperbanktransfer, chosenPlanObject?.planprice))
        }
        // eslint-disable-next-line 
    }, [chosenPlanObject, paymentMethod])

    return<>
        <Container
            className="package-action__container"
            fluid style={{
                     width:'88%'
                 }}>
             <Row className="mb-3">
              <Col xs="12" sm="12" md="6">
              <FormGroup className="package-action__form-group">
                        <Label>Unique IUC or Device Number</Label>
                        <Input 
                         name="devicenumber"
                         type="tel"
                         placeholder="080123456788493443"
                         value={deviceNumber}
                         onChange={e => updateDeviceNumber(e)}
                        />
                        {
                            deviceNumber.length > 0 && <>
                                {
                                (deviceNumber.length < 9 || deviceNumber.length > 25) && (
                                <p className="validation-error-text">invalid phone number type</p>
                                    )
                                }
                            </>
                        }
                </FormGroup>
                <FormGroup className="package-action__form-group">
                    <Label>Choose A Plan</Label>
                    <Input onChange={e => chosePlan(e)} type="select">
                        <option key="urejnf94" value="">Select A Plan</option>
                        {
                            singlePackage.packageplan.map((plan) => <><option value={plan.id} style={{
                                fontSize:'14px',
                                margin:'15px'
                            }} key={plan.id}>
                                { plan.planname } {` (${plan.plandescription})`}
                            </option></>)
                        }
                    </Input>
                    {
                       idOfChosePlan.length === 0 && <>
                            <p className="validation-error-text">you must chose a data plan</p>
                        </>
                    }
                </FormGroup>
                <FormGroup className="package-action__form-group">
                    <Label>Billing Email</Label>
                    <Input 
                        name="billing-email"
                        type="email"
                        value={billingEmail}
                        placeholder="johndoe@gmail.com"
                        onChange={e => updateBillingEmail(e)}
                    />
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="6">
              <Card className="package-action_payment-cta">
                    <h2 className="call-to-action__text">
                        Buy A {`${singlePackage.packagename}`} Decoder Plan
                    </h2>
                    <div className="recipient-details_and_amount">
                        <div className="data-plan-infomation">
                         <p className="paragraph-info">Plan:</p>
                           <p>{chosenPlanObject === undefined ? "chose a valid plan" :  `${chosenPlanObject?.planname}` }</p>
                        </div>

                        <div className="recipient-info">
                            <p className="paragraph-info">To:</p>
                            <p className="recharge-number">{
                                deviceNumber.length !== 0 ?
                                 <>
                                    {deviceNumber}
                                 </> : <>{<small>Device number not specified</small>}</>
                            }</p>
                        </div>
                    </div>
                    <div className="data-plan-amount-info-container">
                    <div className="amount-info">
                            <p className="paragraph-info">Amount:</p> {
                                chosenPlanObject !== undefined && <>
                                    {
                                        paymentMethod === 'dcc' ?
                                         <span className="small">(payment amount with credit/debit card)</span> :
                                         <span className="small">(payment amount with bank transfer)</span>
                                    }
                                </>
                            }
                             <h3 className="cost-header">
                                 {
                                chosenPlanObject !== undefined ? <>
                                    {
                                        paymentMethod === 'dcc' ? 
                                        <>
                                         &#8358;
                                         <CurrencyFormat 
                                            value={calculateDiscounPerCardPayment(singlePackage.packagediscountpercard, chosenPlanObject?.planprice)}
                                            displayType='text'
                                            thousandSeparator={true}
                                            fixedDecimalScale={true}
                                            decimalScale={2}
                                            />
                                        </> : 
                                        <> 
                                        &#8358;
                                        <CurrencyFormat 
                                            value= {calculateDiscountPerBankTransfer(singlePackage.packagediscountperbanktransfer, chosenPlanObject?.planprice)}
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
                               }} className="small">amount not specified</p>) 
                            }
                            </h3>
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

                    <div className="payment-method__btn mb-3">
                        <Button
                         block
                         disabled={
                          (deviceNumber.length < 9 || deviceNumber.length > 25) ||
                          idOfChosePlan.length === 0
                         }
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

export default DecoderSubscriptionComponents