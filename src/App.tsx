import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core";
import "./App.css";

import {
  RegistrationForm,
  Navigation,
  LoginForm,
  Dashboard,
  WorkoutPlanPage,
} from "./components";
import { UserContextProvider, ApiProvider } from "./context";

function App() {
  const darkTheme = createTheme({
    palette: {
      type: "dark",
    },
  });

  return (
    <UserContextProvider>
      <ApiProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Router>
            <Navigation />
            <Container>
              <Switch>
                <Route exact path="/register">
                  <RegistrationForm />
                </Route>
                <Route exact path="/">
                  <p>Hello World!</p>
                </Route>
                <Route exact path="/login">
                  <LoginForm />
                </Route>
                <Route exact path="/dashboard">
                  <Dashboard />
                </Route>
                <Route exact path="/workout-plan/:plan">
                  <WorkoutPlanPage />
                </Route>
              </Switch>
            </Container>
          </Router>
        </ThemeProvider>
      </ApiProvider>
    </UserContextProvider>
  );
}

export default App;
