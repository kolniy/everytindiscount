import React from 'react'

export const AdminAccountItem = ({
    account,
    index
}) => {
    return <>
         <tr>
        <td>{index + 1}</td>
        <td style={{fontSize:'14px'}}>
            {
             account.name
            }
        </td> 
        <td style={{fontSize:'14px'}}>
            {
                account.email
            }
        </td>
        <td style={{fontSize:'13.6px'}}>
            {
                account.role
            }
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
