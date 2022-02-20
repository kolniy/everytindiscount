import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import authDispatch from "./state/auth";
import { useLazyQuery, gql } from "@apollo/client";
import PrivateAdminRoute from "./routers/PrivateAdminRoute";
import { USER_AUTHENTICATED } from "./action/types";

import "./styles/assets/vendor/nucleo/css/nucleo.css";
import "./styles/assets/vendor/font-awesome/css/font-awesome.min.css";
import "./styles/assets/css/argon-dashboard-react.css"
import "./styles/assets/css/argon-design-system-react.css";

// custom styles
import './App.scss';

import Landing from "./components/home/Landing"
import AdminLandingPage from "./components/Admin/Index"
import AdministratorsPage from "./components/Admin/Administrators/Adminpage"
import AdminMarketersPage from "./components/Admin/Marketers/MarketersPage"
import AdminTransactionsPage from "./components/Admin/Transactions/TransactionsPage"
import AdminPackageTypePage from "./components/Admin/PackageTypes/PackageTypePage"
import AdminPackagesPage from "./components/Admin/Packages/PackagesPage"
import AdminSinglePackageItemPage from "./components/Admin/Packages/AdminSinglePackageItemPage"
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
// const history = createBrowserHistory()

// const appJsx = 

function App() {

     const [getUser, { loading: appLoading, data }] = useLazyQuery(USER, {
       onCompleted: ({ me }) => {
        authDispatch({
          type: USER_AUTHENTICATED,
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

  if(localStorage.getItem('token') === null){
    return (<Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/package/single/:packageid" component={SinglePackageDisplayPage} />
        <Route exact path="/signup" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateAdminRoute exact path="/admin" component={AdminLandingPage} />
        <PrivateAdminRoute exact path="/admin/administrators" component={AdministratorsPage} />
        <PrivateAdminRoute exact path="/admin/marketers" component={AdminMarketersPage} />
        <PrivateAdminRoute exact path="/admin/transaction" component={AdminTransactionsPage} />
        <PrivateAdminRoute exact path="/admin/packagetypes" component={AdminPackageTypePage} />
        <PrivateAdminRoute exact path="/admin/packages" component={AdminPackagesPage} />
        <PrivateAdminRoute exact path="/admin/package/packageitem/:packageitemId" component={AdminSinglePackageItemPage} />
        <PrivateAdminRoute exact path="/admin/profile" component={AdminProfilePage} />
        <PrivateAdminRoute exact path="/admin/users" component={AdminUsersPage} />
      </Switch>
    </Router> )
  } else {
      if(appLoading === true && data?.me === undefined){
        return <p className="text-center lead">Loading...</p>
      } else {
       return (<Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/package/single/:packageid" component={SinglePackageDisplayPage} />
          <Route exact path="/signup" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateAdminRoute exact appLoading={appLoading} path="/admin" component={AdminLandingPage} />
          <PrivateAdminRoute exact appLoading={appLoading} path="/admin/administrators" component={AdministratorsPage} />
          <PrivateAdminRoute exact appLoading={appLoading} path="/admin/marketers" component={AdminMarketersPage} />
          <PrivateAdminRoute exact appLoading={appLoading} path="/admin/transaction" component={AdminTransactionsPage} />
          <PrivateAdminRoute exact appLoading={appLoading} path="/admin/packagetypes" component={AdminPackageTypePage} />
          <PrivateAdminRoute exact appLoading={appLoading} path="/admin/packages" component={AdminPackagesPage} />
          <PrivateAdminRoute exact appLoading={appLoading} path="/admin/package/packageitem/:packageitemId" component={AdminSinglePackageItemPage} />
          <PrivateAdminRoute exact appLoading={appLoading} path="/admin/profile" component={AdminProfilePage} />
          <PrivateAdminRoute exact appLoading={appLoading} path="/admin/users" component={AdminUsersPage} />
        </Switch>
      </Router> )
      }
  }
  
}

export default App;
