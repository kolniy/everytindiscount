import React from 'react'
import CurrencyFormat from 'react-currency-format'
import moment from 'moment'

const AdminUserTransactionItem = ({
    transaction
}) => {
  return <>
    <tr className={`${transaction.isseen === false && "unseen"}`}>
    <td>
        {
            moment(parseInt(transaction.createdat)).format('MMMM Do YYYY, h:mm:ss a')
        }
    </td>
    <td>
        {
            transaction.packageplan === null ? 'Airtime Recharge' : transaction.packageplan.planname
        }
    </td>
    <td>
        {
            transaction.vendor
        }
    </td>
    <td>
        {
            transaction.packageplan === null ? 'Airtime Recharge' : transaction.packageplan.packagetype.name
        }
    </td>
    <td>
    &#8358;{
             <CurrencyFormat 
             value={transaction.amount}
             displayType='text'
             thousandSeparator={true}
          />
        }
    </td>
    <td>
        {
            transaction.valuerecipient
        }
    </td>
    <td className='text-center'>
        {
            transaction.paymentmethod
        }
    </td>
    <td>
        {
            transaction.reference
        }
    </td>
    <td>
        {
            transaction.paymentreference
        }
    </td>
    <td>
        {
            transaction.transactionby.name
        }
    </td>
    <td>
        {
            transaction.transactionby.email
        }
    </td>
    <td>
        {
            transaction.transactionby.phonenumber
        }
    </td>
    </tr>
  </>
}

export default AdminUserTransactionItem
