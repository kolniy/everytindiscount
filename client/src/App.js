import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import authDispatch from "./state/auth";
import { useLazyQuery, gql } from "@apollo/client";
// import Todos from "./components/Todos";

import "./styles/assets/vendor/nucleo/css/nucleo.css";
import "./styles/assets/vendor/font-awesome/css/font-awesome.min.css";
import "./styles/assets/css/argon-design-system-react.css";
import "./styles/assets/css/argon-dashboard-react.css"

// custom styles
import './App.scss';

import Landing from "./components/home/Landing"
import AdminLandingPage from "./components/Admin/Index"
import AdministratorsPage from "./components/Admin/Administrators/Adminpage"
import AdminMarketersPage from "./components/Admin/Marketers/MarketersPage"
import AdminTransactionsPage from "./components/Admin/Transactions/TransactionsPage"
import AdminPackageTypePage from "./components/Admin/PackageTypes/PackageTypePage"
import AdminPackagesPage from "./components/Admin/Packages/PackagesPage"
import AdminProfilePage from "./components/Admin/Profile/ProfilePage"
import AdminUsersPage from "./components/Admin/Users/UsersPage"
import SinglePackageDisplayPage from "./components/pages/SinglePackageDisplayPage";
import Register from "./components/auth/Register"
import Login from "./components/auth/Login"

const USER = gql`
 query {
  me {
    id
    email
    name
    role
  }
}
`

function App() {

     const [getUser] = useLazyQuery(USER, {
       onCompleted: ({ me }) => {
        authDispatch({
          type:"USER_AUTHENTICATED",
          payload: {
            token: localStorage.getItem('token'),
            user: me,
            isAuthenticated: true
          }
        })
       }
     })

     useEffect(() => {
      if(localStorage.getItem('token') !== null){
        getUser()
      }
      // eslint-disable-next-line
     }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/admin" component={AdminLandingPage} />
        <Route exact path="/admin/administrators" component={AdministratorsPage} />
        <Route exact path="/admin/marketers" component={AdminMarketersPage} />
        <Route exact path="/admin/transaction" component={AdminTransactionsPage} />
        <Route exact path="/admin/packagetypes" component={AdminPackageTypePage} />
        <Route exact path="/admin/packages" component={AdminPackagesPage} />
        <Route exact path="/admin/profile" component={AdminProfilePage} />
        <Route exact path="/admin/users" component={AdminUsersPage} />
        <Route exact path="/package/single/:packageid" component={SinglePackageDisplayPage} />
        <Route exact path="/signup" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>  
  )
}

export default App;
