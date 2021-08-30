import React from "react";
import {
  Typography,
  Card,
  List,
  ListItem,
  makeStyles,
  Divider,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

export interface Props {
  title: string;
  exercises: { name: string }[];
}

const useStyles = makeStyles((theme) => ({
  exerciseList: {
    backgroundColor: theme.palette.background.paper,
  },
  exerciseTitle: {
    marginBottom: "1vh",
  },
  titleContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1vh",
    alignItems: "center",
  },
}));

const WorkoutCard = ({ title, exercises }: Props) => {
  const styles = useStyles();
  const exerciseMarkup =
    exercises.length > 0 ? (
      exercises.map((item, index) => {
        if (index === exercises.length - 1) {
          return <ListItem>{item.name}</ListItem>;
        }
        return (
          <>
            <ListItem>{item.name}</ListItem>
            <Divider />
          </>
        );
      })
    ) : (
      <ListItem>No Exercises</ListItem>
    );
  return (
    <div>
      <div className={styles.titleContainer}>
        <Typography variant="h6" className={styles.exerciseTitle}>
          {title}
        </Typography>
        <Button variant="contained" color="secondary" type="submit">
          <DeleteIcon />
        </Button>
      </div>
      <Card variant="outlined">
        <List className={styles.exerciseList}>{exerciseMarkup}</List>
      </Card>
    </div>
  );
};

export { WorkoutCard };
