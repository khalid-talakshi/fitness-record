import React, { useState, useContext } from "react";
import { gql, useMutation } from "@apollo/client";
import {
  TextField,
  makeStyles,
  Card,
  Typography,
  Button,
} from "@material-ui/core";
import { UserContext } from "../../context";
import { useHistory } from "react-router-dom";
import { ErrorToast } from "..";

const LOGIN_USER = gql`
  mutation Login($loginEmail: String!, $loginPassword: String!) {
    login(email: $loginEmail, password: $loginPassword) {
      result {
        token
        user {
          name
          email
        }
      }
      error {
        name
        message
      }
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  mainContainer: {
    padding: 2,
    marginTop: 10,
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    justifyContent: "center",
    alignSelf: "center",
    paddingBottom: 10,
  },
  middleTextField: {
    marginLeft: 10,
    marginRight: 10,
  },
  validInput: {
    borderColor: "green",
    borderWidth: 2,
  },
  invalidInput: {
    borderColor: "red",
    borderWidth: 2,
  },
  margin: {
    margin: theme.spacing(2),
  },
}));

export const LoginForm = () => {
  const [login] = useMutation(LOGIN_USER);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const classes = useStyles();
  const { updateUserToken } = useContext(UserContext);
  const history = useHistory();

  const createUser = async () => {
    const { data } = await login({
      variables: {
        loginEmail: email,
        loginPassword: password,
      },
    });
    if (data?.login?.result) {
      updateUserToken(data.login.result.token);
      history.push("/dashboard");
    } else if (data?.login?.error) {
      setErrorMessage(data.login.error.message);
    }
  };

  const closeToast = () => {
    setErrorMessage("");
  };

  return (
    <>
      <Card className={classes.mainContainer}>
        <Typography variant="h4">Login</Typography>
        <form
          className={classes.form}
          onSubmit={(e) => {
            e.preventDefault();
            createUser();
          }}
        >
          <TextField
            label="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={`${classes.margin}`}
            variant="outlined"
          />
          <TextField
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            variant="outlined"
            className={`${classes.margin}`}
          />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </Card>
      <ErrorToast
        open={Boolean(errorMessage)}
        handleClose={closeToast}
        duration={6000}
        message={errorMessage}
      />
    </>
  );
};
