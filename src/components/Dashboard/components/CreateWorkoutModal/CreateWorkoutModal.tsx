import React, { useState } from "react";
import {
  Dialog,
  Card,
  Typography,
  CardContent,
  TextField,
  makeStyles,
  Button,
  DialogContent,
  FormControl,
} from "@material-ui/core";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

export interface Props {
  open?: boolean;
  handleClose(): void;
  createWorkout(name: string): void;
}

const useStyles = makeStyles((theme) => ({
  textfield: {
    width: "70%",
  },
  form: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignSelf: "center",
    paddingTop: 10,
  },
}));

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

const CreateWorkoutModal = ({ open, handleClose, createWorkout }: Props) => {
  const styles = useStyles();
  const [workoutPlanName, setWorkoutPlanName] = useState("");
  const [createPlan] = useMutation(CREATE_WORKOUT_PLAN);

  return (
    <Dialog open={Boolean(open)} onClose={handleClose}>
      <DialogContent>
        <Typography variant="h5">Create New Workout Plan</Typography>
        <form
          className={styles.form}
          onSubmit={async (e) => {
            e.preventDefault();
            await createWorkout(workoutPlanName)
          }}
        >
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            className={styles.textfield}
            value={workoutPlanName}
            onChange={(event) => setWorkoutPlanName(event?.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { CreateWorkoutModal };
