import React from "react";
import { gql, useQuery } from "@apollo/client";

const TEST_QUERY = gql`
  query ExampleQuery {
    info
  }
`;

export const RegistrationForm = () => {
  const { data } = useQuery(TEST_QUERY);

  console.log(data);
  return <p>Register</p>;
};
