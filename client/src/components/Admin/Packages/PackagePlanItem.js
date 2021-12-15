import React, { useState } from 'react'
import { Media, Badge } from 'reactstrap'
import CurrencyFormat from 'react-currency-format'
import calculateDiscounPerCardPayment from '../../../utilities/calculateDiscountPerCardPayment'
import calculateDiscountPerBankTransfer from '../../../utilities/calculateDiscountPerBankTransfer'
import DeletePackagePlanConfirmationModal from './DeletePackagePlanConfirmationModal'

export const PackagePlanItem = ({
     packagePlanItem,
     packageLogo,
    bankTransferDiscount,
    cardDiscount
 }) => {

    const [ deletePackagePlanConfirmation, setDeletPackagePlanConfirmation ] = useState(false)
    const toggleDisplayDeletePackagePlanConfirmation = () => setDeletPackagePlanConfirmation(!deletePackagePlanConfirmation)

    const handleDeletePlan = () => {
        console.log(packagePlanItem.id)
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
        <td>
            <Badge color="" className="badge-dot mr-4">
            <i className="bg-warning" />
            {
            packagePlanItem.plandescription
            }
            </Badge>
        </td>
        <td>
          <div className="plan-items-actions">
              <div className="edit-item-icon mr-2 ml-2">
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
    />
    </>
}

export default PackagePlanItem