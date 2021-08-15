import React from "react";
import { Switch, Route, BrowserRouter as Router, Link } from "react-router-dom";
import "./App.css";

import { RegistrationForm } from "./components";

function App() {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/register">
          <RegistrationForm />
        </Route>
        <Route exact path="/">
          <p>Hello World!</p>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
