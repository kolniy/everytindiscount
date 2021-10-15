import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
// import Todos from "./components/Todos";

import "./styles/assets/vendor/nucleo/css/nucleo.css";
import "./styles/assets/vendor/font-awesome/css/font-awesome.min.css";
import "./styles/assets/css/argon-design-system-react.css";

// custom styles
import './App.scss';

import Landing from "./components/home/Landing"
import SinglePackageDisplayPage from "./components/pages/SinglePackageDisplayPage";
import Register from "./components/auth/Register"
import Login from "./components/auth/Login"

// alert('ran') // demonstating that this always runs all through the app

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/package/single/:packageid" component={SinglePackageDisplayPage} />
        <Route exact path="/signup" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>  
  )
}

export default App;
