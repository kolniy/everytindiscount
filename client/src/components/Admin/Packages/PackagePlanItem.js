import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Media } from 'reactstrap'
import { useAlert } from 'react-alert'
import CurrencyFormat from 'react-currency-format'
import calculateDiscounPerCardPayment from '../../../utilities/calculateDiscountPerCardPayment'
import calculateDiscountPerBankTransfer from '../../../utilities/calculateDiscountPerBankTransfer'
import DeletePackagePlanConfirmationModal from './DeletePackagePlanConfirmationModal'
import { SINGLE_PACKAGE_QUERY } from './AdminSinglePackageItemPage'
import UpdatePackagePlanModal from './UpdatePackagePlanModal'

const DELETE_PACKAGE_PLAN_MUTATION = gql`
    mutation($idOfPackagePlanToDelete: ID!){
        deletePackagePlan(idOfPackagePlanToDelete: $idOfPackagePlanToDelete){
            id
            planname
            planprice
            plandescription
        }
    }
`

const PackagePlanItem = ({
     packagePlanItem,
     packageLogo,
    bankTransferDiscount,
    cardDiscount,
    packageId
 }) => {

    const [ deletePackagePlanConfirmation, setDeletPackagePlanConfirmation ] = useState(false)
    const [ updatePlanModal, setUpdatePlanModal ] = useState(false)

    const toggleUpdatePlanModal = () => setUpdatePlanModal(!updatePlanModal)
    const toggleDisplayDeletePackagePlanConfirmation = () => setDeletPackagePlanConfirmation(!deletePackagePlanConfirmation)
    const alert = useAlert()

    const [ deletePackagePlan, { loading } ] = useMutation(DELETE_PACKAGE_PLAN_MUTATION, {
        variables: {
            idOfPackagePlanToDelete: packagePlanItem.id
        },
        onError: (error) => {
            alert.show(error.message, {
                type:'error'
            })
        },
        onCompleted: () => {
            alert.show('Plan Deleted Successfully', {
                type:'success'
            })
            toggleDisplayDeletePackagePlanConfirmation()
        },
        update(cache, { data: { deletePackagePlan }}){

            const { singlePackage } = cache.readQuery({
                query: SINGLE_PACKAGE_QUERY,
                variables: {
                    packageId: packageId
                }
            })

            cache.writeQuery({
                query: SINGLE_PACKAGE_QUERY,
                variables: {
                    packageId: packageId
                },
                data: {
                    singlePackage: {
                        ...singlePackage,
                        packageplan: singlePackage.packageplan.filter((plan) => plan.id !== deletePackagePlan.id)
                    }
                }
            })
        }
    })

    const handleDeletePlan = () => {
        deletePackagePlan()
    }

    return <>
     <tr>
        <th scope="row">
            <Media className="align-items-center">
            <a
                className="avatar rounded-circle mr-3"
                href="#pablo"
                onClick={e => e.preventDefault()}
            >
                <img
                alt="..."
                src={packageLogo}
                />
            </a>
            <Media>
                <span className="mb-0 text-sm">
                    {packagePlanItem.planname}
                </span>
            </Media>
            </Media>
        </th>
        <td>
        <CurrencyFormat 
            value={packagePlanItem.planprice}
            prefix={' #'}
            suffix={' NGN'}
            displayType='text'
            thousandSeparator={true}
         />
        </td>
        <td>{calculateDiscountPerBankTransfer(bankTransferDiscount, packagePlanItem.planprice)}</td>
        <td>{calculateDiscounPerCardPayment(cardDiscount, packagePlanItem.planprice)}</td>
        <td className='td-description-container' title={packagePlanItem.plandescription}>
            <p className="badge-dot mr-2 package-plan-item-description">
            <i className="bg-warning" />
            {
            packagePlanItem.plandescription
            }
            </p>
        </td> 
        <td>
          <div className="plan-items-actions">
              <div onClick={toggleUpdatePlanModal} className="edit-item-icon mr-2 ml-2">
                <i className="fas fa-edit"></i>
              </div>
              <div onClick={toggleDisplayDeletePackagePlanConfirmation} className="delete-item-icon mr-2 ml-2">
                <i className="fas fa-times delete-icon"></i>
              </div>
          </div>
        </td>
    </tr>
    <DeletePackagePlanConfirmationModal 
        modalOpen={deletePackagePlanConfirmation}
        toggleModalOpen={toggleDisplayDeletePackagePlanConfirmation}
        handleDeletePlan={handleDeletePlan}
        operationLoading={loading}
    />
    <UpdatePackagePlanModal
        displayModal={updatePlanModal}
        toggleModal={toggleUpdatePlanModal}
        planDetails={packagePlanItem}
    />
    </>
}

export default PackagePlanItem