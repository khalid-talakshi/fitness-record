import gql from "graphql-tag";

export const ADD_WORKOUT = gql`
  mutation addWorkout($workoutId: String!, $name: String!) {
    addWorkout(workoutId: $workoutId, name: $name) {
      result {
        name
        workouts {
          name
          exercises {
            name
            reps
            set
          }
        }
      }
      error {
        message
        name
      }
    }
  }
`;
