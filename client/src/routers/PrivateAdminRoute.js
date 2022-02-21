import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Route, Redirect } from 'react-router-dom'
import { Auth } from "../state/auth"

// const GET_USER_AUTH_STATE = gql`
//      query {
//       Auth @client
//     }
// `

const PrivateAdminRoute = ({ component: Component, ...rest }) => {

    // const { data } = useQuery(GET_USER_AUTH_STATE)
    // const { isAuthenticated } = data.Auth

    const AuthState = useReactiveVar(Auth)
  
    return (
        <Route 
            {...rest}
            render={(props) => {
                if(AuthState.isAuthenticated){
                    return <Component {...props} />
                } else {
                    return <Redirect to="/login" />
                }
            }}
        />
    )
}

export default PrivateAdminRoute