import React, { useState } from "react";
import {
  Dialog,
  Typography,
  TextField,
  makeStyles,
  Button,
  DialogContent,
} from "@material-ui/core";

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

const CreateWorkoutModal = ({ open, handleClose, createWorkout }: Props) => {
  const styles = useStyles();
  const [workoutPlanName, setWorkoutPlanName] = useState("");

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
