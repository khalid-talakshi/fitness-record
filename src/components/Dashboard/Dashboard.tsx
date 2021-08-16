import { useQuery, gql } from "@apollo/client";
import React from "react";

const GET_USERDETAILS = gql`
  query getUserDetails {
    getUserDetails {
      name
    }
  }
`;

export const Dashboard = () => {
  const { data } = useQuery(GET_USERDETAILS);
  return <p>{data?.getUserDetails?.name || "Test"}</p>;
};
