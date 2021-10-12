import React from 'react';
import ReactDOM from 'react-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { url } from "./service/globals"
import AlertTemplate from 'react-alert-template-basic'

// react alert config optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_RIGHT,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

const httpLink = createHttpLink({
  uri: url
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
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
