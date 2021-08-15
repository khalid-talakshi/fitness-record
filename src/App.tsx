import React from "react";
import { Switch, Route, BrowserRouter as Router, Link } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core";
import "./App.css";

import { RegistrationForm, Navigation } from "./components";

function App() {
  const client = new ApolloClient({
    uri: "https://6642b518cdba.ngrok.io/graphql",
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
            </Switch>
          </Container>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
