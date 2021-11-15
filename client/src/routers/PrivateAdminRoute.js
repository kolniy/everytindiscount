import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Route, Redirect } from 'react-router-dom'

const GET_USER_AUTH_STATE = gql`
     query {
      Auth @client
    }
`

const PrivateAdminRoute = ({ component: Component, ...rest }) => {
    const { data } = useQuery(GET_USER_AUTH_STATE)
    const { isAuthenticated, user } = data.Auth

    return (
        <Route 
            {...rest}
            component={(props) => (
                isAuthenticated === true && user !== null && user?.role === 'admin' ? 
                (<Component {...props} />) :
                 (
                    <Redirect to="/" />
                 )
            )}
        />
    )
}

export default PrivateAdminRoute