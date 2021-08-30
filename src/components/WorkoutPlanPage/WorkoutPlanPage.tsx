import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { GET_WORKOUT_PLAN } from "./graphql";
import {
  Container,
  Typography,
  makeStyles,
  Grid,
  Card,
  CardContent,
  Button,
  ListItem,
  List,
  Divider,
} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import { WorkoutCard } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "2vh",
  },
  addWorkoutCard: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "space-between",
  },
  exerciseTitle: {
    marginBottom: "1vh",
  },
  pageIndicator: {
    display: "flex",
    justifyContent: "center",
  },
}));

const WorkoutPlanPage = () => {
  let { plan } = useParams<{ plan: string }>();
  const [getPlan, { data, error, loading }] = useLazyQuery(GET_WORKOUT_PLAN);
  const styles = useStyles();
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    if (plan) {
      console.log(plan);
      getPlan({ variables: { workoutId: plan } });
      console.log(data);
      console.log(error);
    }
  }, []);

  if (loading) {
    return <p>Loading</p>;
  }

  const titleMarkup = (
    <Typography variant="h4">{data?.getWorkoutPlan?.name}</Typography>
  );

  const workoutMarkup = data?.getWorkoutPlan?.workouts.map(
    (item: any, index: number) => (
      <WorkoutCard title={item.name} exercises={item.exercises} key={index} />
    )
  );

  const addWorkoutCardMarkup = (
    <div className={styles.addWorkoutCard}>
      <Typography variant="h6">Add New Workout</Typography>
      <Button variant="contained" color="primary">
        New Workout
      </Button>
    </div>
  );

  return (
    <>
      <Container className={styles.root}>
        <Grid container>
          <Grid item xs={12}>
            {titleMarkup}
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" className={styles.exerciseTitle}>
                Workouts
              </Typography>
              <SwipeableViews
                enableMouseEvents
                resistance
                index={pageIndex}
                onChangeIndex={(idx: number) => setPageIndex(idx)}
              >
                {workoutMarkup}
                {addWorkoutCardMarkup}
              </SwipeableViews>
              <div className={styles.pageIndicator}>
                <p>Page {pageIndex + 1} of {data?.getWorkoutPlan?.workouts?.length + 1}</p>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </>
  );
};

export { WorkoutPlanPage };
