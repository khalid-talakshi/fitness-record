import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core";
import "./App.css";

import { RegistrationForm, Navigation, LoginForm } from "./components";

function App() {
  const client = new ApolloClient({
    link: new HttpLink({
      uri: "http://31c5bea63c30.ngrok.io/graphql",
      fetchOptions: "no-cors",
    }),
    cache: new InMemoryCache(),
  });

  const darkTheme = createTheme({
    palette: {
      type: "dark",
    },
  });

  return (
    <ApolloProvider client={client}>
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
            </Switch>
          </Container>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
