import React, { useState } from "react";
import { Typography, Card, CardContent, Button } from "@material-ui/core";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import { CreateWorkoutModal } from "../CreateWorkoutModal";

const GET_WORKOUT_PLANS = gql`
  query getWorkoutPlans {
    getWorkoutPlans {
      id
      name
    }
  }
`;

const CREATE_WORKOUT_PLAN = gql`
  mutation workoutPlanCreate($name: String!) {
    createWorkoutPlan(name: $name) {
      result {
        id
      }
      error {
        message
        name
      }
    }
  }
`;

const WorkoutsCard = () => {
  const { data, error, refetch } = useQuery(GET_WORKOUT_PLANS);
  const [openModal, setOpenModal] = useState(false);
  const [createPlan] = useMutation(CREATE_WORKOUT_PLAN);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const createWorkout = async (name: string) => {
    try {
      await createPlan({ variables: { name } });
    } finally {
      handleCloseModal();
      await refetch();
    }
  };

  const cardMarkup = () => {
    if (data?.getWorkoutPlans?.length) {
      return <p>There are workouts</p>;
    } else {
      return (
        <>
          <p>No Workout Plans Found</p>
          <Button variant="contained" color="primary" onClick={handleOpenModal}>
            Create a Workout Plan
          </Button>
        </>
      );
    }
  };

  console.log("data", data);
  console.log("errors", error);
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5">Workout Plans</Typography>
          {cardMarkup()}
        </CardContent>
      </Card>
      <CreateWorkoutModal
        open={openModal}
        handleClose={handleCloseModal}
        createWorkout={createWorkout}
      />
    </>
  );
};

export { WorkoutsCard };
