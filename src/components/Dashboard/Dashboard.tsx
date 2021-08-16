import React, { useContext } from "react";
import { UserContext } from "../../context";

export const Dashboard = () => {
  const { userToken } = useContext(UserContext);
  return <p>{userToken}</p>;
};
