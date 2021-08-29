import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Button,
  makeStyles,
  ButtonGroup,
} from "@material-ui/core";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import { CreateWorkoutModal } from "../CreateWorkoutModal";
import { ObjectId } from "mongodb";
import DeleteIcon from "@material-ui/icons/Delete";
import LaunchIcon from "@material-ui/icons/Launch";

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
        name
      }
      error {
        message
        name
      }
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  workoutItem: {
    display: "flex",
    justifyContent: "space-between",
  },
  createWorkoutButton: {
    marginTop: theme.spacing(2),
  },
  cardList: {
    marginTop: theme.spacing(2),
  },
}));

const WorkoutsCard = () => {
  const { data, error, refetch } = useQuery(GET_WORKOUT_PLANS);
  const [openModal, setOpenModal] = useState(false);
  const [createPlan] = useMutation(CREATE_WORKOUT_PLAN);
  const styles = useStyles();

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
  
  useEffect(()=> {
      refetch()
  }, [])

  const cardMarkup = () => {
    if (data?.getWorkoutPlans?.length) {
      const array = data.getWorkoutPlans.map(
        (item: { id: ObjectId; name: string }) => (
          <Card variant="outlined">
            <CardContent>
              <div className={styles.workoutItem}>
                <p>{item.name}</p>
                <ButtonGroup color="primary" variant="contained">
                  <Button>Active</Button>
                  <Button>
                    <LaunchIcon />
                  </Button>
                  <Button>
                    <DeleteIcon />
                  </Button>
                </ButtonGroup>
              </div>
            </CardContent>
          </Card>
        )
      );
      return (
        <div className={styles.cardList}>
          {array}
          {/* <Button variant="contained" color="primary" onClick={handleOpenModal}>
            Create a Workout Plan
          </Button> */}
        </div>
      );
    } else {
      return (
        <>
          <p>No Workout Plans Found</p>
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenModal}
            className={styles.createWorkoutButton}
          >
            Create a Workout Plan
          </Button>
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
