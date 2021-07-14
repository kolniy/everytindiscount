import React, { useState } from "react"
import { Card, CardBody, Form, FormGroup, Input, Button } from "reactstrap"

const ContactForm = () => {

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        message: ''
    })

    const { email, name, message } = formData

    const updateFormData = (e) => setFormData({...formData, [e.target.name] : e.target.value } )

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        console.log(formData)
        setFormData({
            email:'',
            name:'',
            message:''
        })
   }
  return (
  <Card className="shadow">
    <CardBody>
        <p className="h6">Send Us a Message.</p>
                <Form
                onSubmit={e => handleFormSubmit(e)}
                >
                <FormGroup>
                    <Input
                    className="form-control-alternative contact-input-style"
                     placeholder="Name"
                     type="name"
                     value={name}
                     name="name"
                     onChange={(e) => updateFormData(e)}
                     autoComplete="off"
                     required
                />
                    </FormGroup>
                    <FormGroup>
                    <Input
                    className="form-control-alternative contact-input-style"
                     placeholder="Email"
                     type="email"
                     value={email}
                     name="email"
                     onChange={(e) => updateFormData(e)}
                     autoComplete="off"
                     required
                />
                    </FormGroup>
            <Input
            className="form-control-alternative contact-input-style"
            placeholder="Message"
            rows="3"
            type="textarea"
            name="message"
            value={message}
            autoComplete="off"
            onChange={(e) => updateFormData(e)}
            required
          />
          <FormGroup className="submit-message-btn-container">
              <Button className="btn-icon message-submit-btn" type="submit" color="primary" size="lg"> Send {" "} <i className="fa fa-envelope" aria-hidden="true"></i> </Button>
          </FormGroup>
                </Form>
            </CardBody>
          </Card>
        )
}

export default ContactForm
