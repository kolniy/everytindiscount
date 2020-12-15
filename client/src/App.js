import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import './App.scss';
import "./styles/assets/vendor/nucleo/css/nucleo.css";
import "./styles/assets/vendor/font-awesome/css/font-awesome.min.css";
import "./styles/assets/css/argon-design-system-react.css";
import Header from "./components/Layout/Header"
import Footer from "./components/Layout/Footer"
import Landing from "./components/home/Landing"
import Register from "./components/auth/Register"
import Login from "./components/auth/Login"

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/signup" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
      <Footer />
    </Router>  
  )
}

export default App;
