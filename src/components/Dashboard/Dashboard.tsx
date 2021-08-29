import React from "react";
import { useQuery, gql } from "@apollo/client";
import { makeStyles, Typography, Grid, Card, CardContent } from "@material-ui/core";

import {WorkoutsCard} from './components';

const GET_USERDETAILS = gql`
  query getUserDetails {
    getUserDetails {
      id
      name
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "2vh",
  }
}));

export const Dashboard = () => {
  const { data } = useQuery(GET_USERDETAILS);
  const styles = useStyles();

  return (
    <>
      <Grid container spacing={2} className={styles.root}>
        <Grid item xs={12}>
        <Typography variant="h4">
          Welcome, {data?.getUserDetails?.name}
        </Typography>
        </Grid>
        <Grid item xs={12}>
        <p>Let's get started on some new goals!</p>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
            <Typography variant="h5">Today's Workout</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <WorkoutsCard />
        </Grid>
      </Grid>
    </>
  );
};
