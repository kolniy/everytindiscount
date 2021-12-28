import React from 'react'
import { Table } from 'reactstrap'
import { AdminAccountItem } from './AdminAccountItem'

const AdminAccountsContainer = ({
    accounts
}) => {
    return <>
        <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
            <tr>
            <th scope="col">S/N</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            {
                accounts.length === 0 ? <>
                    <tr>
                    <td className='td-description-container'>
                        <p className="text-center">
                            Admin Accounts Not Found!
                        </p>
                    </td>
                </tr>
                </> : <>
                    {
                        accounts.map((account, index) => <AdminAccountItem account={account} index={index} />)
                    }
                </>
            }
        </tbody>
    </Table>
    </>
}

export default AdminAccountsContainer
