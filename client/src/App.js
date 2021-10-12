import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import "./styles/assets/vendor/nucleo/css/nucleo.css";
import "./styles/assets/vendor/font-awesome/css/font-awesome.min.css";
import "./styles/assets/css/argon-design-system-react.css";

// custom styles
import './App.scss';

import Landing from "./components/home/Landing"
import Register from "./components/auth/Register"
import Login from "./components/auth/Login"
// import ExchangeRates from "./ExchangeRates";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/signup" component={Register} />
      <Route exact path="/login" component={Login} />
      </Switch>
    </Router>  
  )
}

export default App;
