import gql from "graphql-tag";

export const GET_WORKOUT_PLAN = gql`
  query Workout($workoutId: String!) {
    getWorkoutPlan(workoutId: $workoutId) {
      id
      name
      workouts {
        name
        exercises {
          name
        }
      }
    }
  }
`;
