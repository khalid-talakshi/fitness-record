import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/register">
          <p>Register</p>
        </Route>
        <Route exact path="/">
          <p>Hello World!</p>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
