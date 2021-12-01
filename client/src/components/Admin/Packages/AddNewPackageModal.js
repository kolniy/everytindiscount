import React from 'react'
import { Modal,
    Card,
   CardHeader,
   CardBody,
   Form, FormGroup,
   InputGroup, InputGroupAddon,
   InputGroupText, Input, Button
} from 'reactstrap'

const AddNewPackageModal = ({
    showAddNewPackageModal,
    toggleShowAddNewPackageModal,
    activePackageTypeId
}) => {

    return <>
        <Modal
         isOpen={showAddNewPackageModal}
         toggle={toggleShowAddNewPackageModal}
         size="md"
         centered
        >
             <Card className="bg-secondary shadow border-0">
                  <CardHeader style={{
                      display:'flex',
                      justifyContent:'space-between',
                      alignItems:'baseline'
                  }} className="bg-transparent pb-2">
                    <h3 style={{
                        fontSize:'16px',
                        fontWeight:'bold'
                    }} className="action-title">Add New Package</h3>
                    <div onClick={toggleShowAddNewPackageModal} className="close-modal-btn">X</div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <Form role="form">
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-hat-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input 
                            placeholder="Package Name" 
                            type="text"
                            name="packagename"
                            required
                             />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                             placeholder="Package Logo"
                              type="text"
                              name="packagelogo"
                              required
                              />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                             placeholder="Package Image"
                              type="text"
                              name="packageimage"
                              required
                              />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                             placeholder="Package Bank Transfer Discount"
                              type="text"
                              name="discountperbanktransfer"
                              required
                              />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                             placeholder="Package Card Transaction Discount"
                              type="text"
                              name="discountpercard"
                              required
                              />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                             placeholder="Package Landing Page Image"
                              type="text"
                              name="packagelandingpageimage"
                              required
                              />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <Input
                             placeholder="Package Description"
                              type="textarea"
                              name="packagedescription"
                              rows={3}
                              required
                              />
                        </FormGroup>
                        <div className="text-center">
                            <Button
                              className="btn-icon mt-4"
                              block
                              color="primary"
                              type="submit"
                            //   disabled={loading}
                                >
                                {/* {
                                 loading ? <>
                                <span className="btn-inner--icon">
                                <i className="fas fa-circle-notch fa-spin"></i>
                                </span>
                                <span className="nav-link-inner--text ml-1">
                                    Loading
                                </span>
                                 </> : <>
                                <span className="btn-inner--icon">
                                <i className="ni ni-single-02"></i>
                                </span>
                                <span className="nav-link-inner--text ml-1">
                                   Add Package
                                </span>
                                 </>
                                } */}
                                  Add Package
                            </Button>
                        </div>
                      </Form>
                  </CardBody>
                </Card>
        </Modal>
    </>
}

export default AddNewPackageModal
