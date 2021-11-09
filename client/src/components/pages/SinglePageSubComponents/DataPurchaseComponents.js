import React, { useState, useEffect } from 'react'
import PaystackPop from "@paystack/inline-js"
import { gql, useQuery } from "@apollo/client"
import { useAlert } from 'react-alert'
import { Container, Card, 
    Row, Col, Input, Label,
    FormGroup, Button
} from 'reactstrap'
 
import paystackimage1 from "../../../images/paystack-ii.png"

const GET_USER_AUTH_STATE = gql`
     query {
       Auth @client
 }
` 

const DataPurchaseComponents = ({ singlePackage, setOpenAuthModal }) => {

    const [ phoneNumber, setPhoneNumber ] = useState('')
    const [ billingEmail, setBillingEmail ] = useState('')
    const [ paymentMethod, setPaymentMethod ] = useState("dcc")
    const { data } = useQuery(GET_USER_AUTH_STATE)
    const alert = useAlert()

    const [ idOfChosePlan, setIdOfChosenPlan ] = useState('')
    const [ chosenPlanObject, setChosenPlanObject ] = useState(null)

    const chosePlan = (e) => {
        setIdOfChosenPlan(e.target.value)
    }

    const updatePhoneNumber = (e) => {
        const number = e.target.value
        if(!number || number.match(/^\d{1,}(\.\d{0,2})?$/)){
            setPhoneNumber(e.target.value)
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
                amount: chosenPlanObject.planprice * 100,
                currency:'NGN',
                channels: ['card'],
                onSuccess: async (transaction) => {
                    console.log(transaction)
                    // send a mutation to validate transaction here
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
                                (phoneNumber.length < 11 || phoneNumber.length > 18) && (
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
                        Buy Data Plan
                    </h2>
                    <div className="recipient-details_and_amount">
                        <div className="data-plan-infomation">
                         <p className="paragraph-info">Plan:</p>
                           <p>{chosenPlanObject === undefined ? "chose a valid plan" :  `${chosenPlanObject?.planname}` }</p>
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
                    <div className="data-plan-amount-info-container">
                    <div className="amount-info">
                            <p className="paragraph-info">Amount:</p>
                             <h3 className="cost-header">
                                 #{
                                chosenPlanObject !== undefined ? <>
                                    {chosenPlanObject?.planprice}
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
                          (phoneNumber.length < 9 || phoneNumber.length > 20) ||
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
    </>
}

export default DataPurchaseComponents
