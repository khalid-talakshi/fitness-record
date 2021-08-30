import gql from "graphql-tag";

export const DELETE_WORKOUT_PLAN = gql`
  mutation deleteWorkout($workoutId: String!) {
    deleteWorkoutPlan(workoutId: $workoutId) {
      result {
        id
        name
      }
      error {
        name
        message
      }
    }
  }
`;
