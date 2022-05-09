import React from 'react'
import ClientVerticalNavbar from '../ClientVerticalNavbar'
import ClientNavbar from '../ClientNavbar'
import ClientWelcomeMessage from '../ClientWelcomeMessage'

const ClientProfilePage = () => {
    return <>
    <ClientVerticalNavbar />
    <div className="main-content">
        <ClientNavbar />
        <ClientWelcomeMessage />
    </div>
  </>
}

export default ClientProfilePage
