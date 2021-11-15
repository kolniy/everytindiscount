import React, { useEffect } from 'react'
import VerticalNavbar from '../VerticalNavbar'
import AdminNavbar from '../AdminNavbar'
import AdminDashboardSummary from '../AdminDashboardSummary'
import updateActiveLink from '../../../state/activeLinkInAdminDashboard'

export const Adminpage = () => {

    useEffect(() => {
        updateActiveLink({
            type:"UPDATE_ACTIVE_LINK",
            payload: 2
        })
    }, [])

    return <>
    <VerticalNavbar />
    <div className="main-content">
            <AdminNavbar />
            <AdminDashboardSummary />
        </div>
    </>
}

export default Adminpage