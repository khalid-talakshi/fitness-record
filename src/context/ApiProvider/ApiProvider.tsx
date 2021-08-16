import React, { useContext } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  createHttpLink,
  concat,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { UserContext } from "../UserContext";
import fetch from "cross-fetch";

export interface Props {
  children?: React.ReactNode;
}

export const ApiProvider = ({ children }: Props) => {
  const { userToken } = useContext(UserContext);
  console.log(userToken);

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: userToken ? `Bearer ${userToken}` : "",
      },
    };
  });

  const httpLink = new HttpLink({
    uri: "https://8de659c63922.ngrok.io/graphql",
    fetch,
    headers: {
      authorization: userToken ? `Bearer ${userToken}` : "",
      "Access-Control-Allow-Origin": "true",
    },
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    headers: {
      authorization: userToken ? `Bearer ${userToken}` : "",
    },
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
