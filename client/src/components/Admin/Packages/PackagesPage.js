import React, { useEffect } from 'react'
import VerticalNavbar from '../VerticalNavbar'
import AdminNavbar from '../AdminNavbar'
import AdminDashboardSummary from '../AdminDashboardSummary'
import updateActiveLink from '../../../state/activeLinkInAdminDashboard'

const PackagesPage = () => {

    useEffect(() => {
        updateActiveLink({
            type:"UPDATE_ACTIVE_LINK",
            payload: 6
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

export default PackagesPage
