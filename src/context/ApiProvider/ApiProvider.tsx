import React, { useContext } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { UserContext } from "../UserContext";
import fetch from "cross-fetch";

export interface Props {
  children?: React.ReactNode;
}

export const ApiProvider = ({ children }: Props) => {
  const { userToken } = useContext(UserContext);

  const httpLink = new HttpLink({
    uri: "https://6280-70-26-10-152.ngrok.io/graphql",
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
