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
            render={(props) => {
                if(isAuthenticated && user?.role === 'admin'){
                    return <Component {...props} />
                } else {
                    return <Redirect to="/login" />
                }
            }}
        />
    )
}

export default PrivateAdminRoute