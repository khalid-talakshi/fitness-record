import gql from 'graphql-tag';

export const CREATE_WORKOUT_PLAN = gql`
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