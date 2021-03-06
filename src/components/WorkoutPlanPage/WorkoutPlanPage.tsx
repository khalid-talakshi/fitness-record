import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_WORKOUT_PLAN, ADD_WORKOUT, DELETE_WORKOUT } from "./graphql";
import {
  Container,
  Typography,
  makeStyles,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
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
  const [getPlan, { data, error, loading, refetch }] =
    useLazyQuery(GET_WORKOUT_PLAN);
  const [addWorkout] = useMutation(ADD_WORKOUT);
  const [deleteWorkout] = useMutation(DELETE_WORKOUT);
  const styles = useStyles();
  const [pageIndex, setPageIndex] = useState(0);
  const [newWorkoutName, setNewWorkoutName] = useState("");

  const handleAddWorkout = async (name: string) => {
    try {
      const { data } = await addWorkout({
        variables: {
          workoutId: plan,
          name: name,
        },
      });
      if (data.addWorkout.result && refetch) {
        await refetch();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDeleteWorkout = async (workoutId: string) => {
    try {
      const { data } = await deleteWorkout({
        variables: { workoutId, workoutPlanId: plan },
      });
      if (data?.deleteWorkout?.result && refetch) {
        await refetch();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

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

  const workoutMarkup = data?.getWorkoutPlan?.workouts.map((item: any) => (
    <WorkoutCard
      id={item.id.toString()}
      title={item.name}
      exercises={item.exercises}
      key={item.id.toString()}
      handleDelete={handleDeleteWorkout}
    />
  ));

  const addWorkoutCardMarkup = (
    <div className={styles.addWorkoutCard}>
      <Typography variant="h6">Add New Workout</Typography>
      <TextField
        label="Workout Name"
        variant="outlined"
        style={{ marginTop: "1vh", marginBottom: "1vh" }}
        value={newWorkoutName}
        onChange={(event) => {
          setNewWorkoutName(event.target.value);
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleAddWorkout(newWorkoutName)}
      >
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
                <p>
                  Page {pageIndex + 1} of{" "}
                  {data?.getWorkoutPlan?.workouts?.length + 1}
                </p>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </>
  );
};

export { WorkoutPlanPage };
