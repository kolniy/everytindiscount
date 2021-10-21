import React from 'react';
import ReactDOM from 'react-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import { ApolloClient, ApolloProvider, ApolloLink, concat, InMemoryCache, createHttpLink } from "@apollo/client"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { url } from "./service/globals"
import AlertTemplate from 'react-alert-template-basic'
import dispatch from './state'
import authDispatch from './state/auth';
import typePolicies from './typePolicies'

window.dispatch = dispatch
window.authDispatch = authDispatch

// react alert config optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_RIGHT,
  timeout: 4500,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.FADE
}

const httpLink = createHttpLink({
  uri: url
})

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
  link: concat(authMiddleware, httpLink),
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
