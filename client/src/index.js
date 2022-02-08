import React from 'react';
import ReactDOM from 'react-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import { ApolloClient, ApolloProvider, ApolloLink, split, concat, InMemoryCache, createHttpLink } from "@apollo/client"
import { getMainDefinition } from "@apollo/client/utilities"
import { WebSocketLink } from '@apollo/client/link/ws';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { url, wsurl } from "./service/globals"
import AlertTemplate from 'react-alert-template-basic'
// import dispatch from './state'
// import authDispatch from './state/auth';
import typePolicies from './typePolicies'

// window.dispatch = dispatch
// window.authDispatch = authDispatch

// react alert config optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_RIGHT,
  timeout: 4500,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.FADE
}

const wsLink = new WebSocketLink({
    uri: wsurl,
    options: {
      reconnect: true
    }
})

const httpLink = createHttpLink({
  uri: url
})

const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
      )
    },
    wsLink,
    httpLink
)

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || '',
    }
  }));

  return forward(operation);
})

const client = new ApolloClient({
  link: concat(authMiddleware, splitLink),
  cache: new InMemoryCache({
    typePolicies: typePolicies
  }),
  // onError: ({ networkError, graphqlErrors }) => {
  //   console.log(networkError, "networkError")
  //   console.log(graphqlErrors, "graphqlErrors")
  // }
  onError: (e) => console.log(e)
})


ReactDOM.render(
  <React.StrictMode>
  <ApolloProvider client={client}>
    <AlertProvider template={AlertTemplate} {...options}>
    <App />
    </AlertProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
