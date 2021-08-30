import React from "react";
import {
  Typography,
  Card,
  List,
  ListItem,
  makeStyles,
  Divider,
} from "@material-ui/core";

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
      <Typography variant="h6" className={styles.exerciseTitle}>
        {title}
      </Typography>
      <Card variant="outlined">
        <List className={styles.exerciseList}>
          {exerciseMarkup}
        </List>
      </Card>
    </div>
  );
};

export { WorkoutCard };
