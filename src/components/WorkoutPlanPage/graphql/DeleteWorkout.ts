import gql from "graphql-tag";

export const DELETE_WORKOUT = gql`
  mutation deleteWorkout(
    $workoutId: String!
    $workoutPlanId: String!
  ) {
    deleteWorkout(
      workoutId: $workoutId
      planId: $workoutPlanId
    ) {
      result {
        id
        name
        workouts {
          id
          name
          exercises {
            name
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
