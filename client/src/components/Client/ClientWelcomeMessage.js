import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Container } from 'reactstrap'

const GET_USER_AUTH_STATE = gql`
    query {
      Auth @client
    }
`

const ClientWelcomeMessage = () => {

    const { data } = useQuery(GET_USER_AUTH_STATE)

    const { Auth: {
      user
    } } = data

  return <>
    <div className="header bg-gradient-danger pb-8 pt-5 pt-md-8">
        <Container>
            <h4 style={{
                color: '#ffffff'
            }} className='h4'>
                Welcome <span style={{
                    fontWeight: '900'
                }}>{ user?.name }</span>
            </h4>
        </Container>
    </div>
  </>
}

export default ClientWelcomeMessage
