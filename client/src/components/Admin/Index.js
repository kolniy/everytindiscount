import React from 'react'
import VerticalNavbar from './VerticalNavbar'
import AdminNavbar from './AdminNavbar'
import AdminDashboardSummary from './AdminDashboardSummary'

export const Index = () => {
    return <>
        <VerticalNavbar />
        <div className="main-content">
            <AdminNavbar />
            <AdminDashboardSummary />
        </div>
    </>
}

export default Index
