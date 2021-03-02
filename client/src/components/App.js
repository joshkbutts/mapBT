import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import MapShow from './MapShow.js'
import HomePage from "./HomePage";
import LandingPage from './LandingPage'
import AuthenticatedRoute from './authentication/AuthenticatedRoute'

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);

  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch (err) {
      setCurrentUser(null)
    }
  }
  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/" component={LandingPage} user={currentUser}/>
        <Route exact path="/welcome" component={LandingPage} user={currentUser}/>
        <AuthenticatedRoute exact path="/my-map" component={HomePage} user={currentUser}/>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <AuthenticatedRoute exact path="/my-map/:id" component={MapShow} user={currentUser}/>
      </Switch>
    </Router>
  );
};

export default hot(App);
