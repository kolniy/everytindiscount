import React from 'react'
import { Media, Badge } from 'reactstrap'
import CurrencyFormat from 'react-currency-format'


export const PackagePlanItem = ({ packagePlanItem, packageLogo }) => {
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
              <div className="delete-item-icon mr-2 ml-2">
                <i className="fas fa-times delete-icon"></i>
              </div>
          </div>
        </td>
    </tr>
    </>
}

export default PackagePlanItem