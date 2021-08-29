import React from "react";
import { useQuery, gql } from "@apollo/client";
import { makeStyles, Typography, Grid, Card, CardContent } from "@material-ui/core";
import { FullscreenExitTwoTone } from "@material-ui/icons";

const GET_USERDETAILS = gql`
  query getUserDetails {
    getUserDetails {
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
        <Grid item xs={6}>
          <Card>
            <CardContent>
            <Typography variant="h5">Today's Workout</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
            <Typography variant="h5">Workouts</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
