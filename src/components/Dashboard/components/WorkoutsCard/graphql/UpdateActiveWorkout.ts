import gql from 'graphql-tag';

export const UPDATE_ACTIVE_WORKOUT = gql`
mutation setActiveWorkout($workoutId: String!) {
  setActiveWorkout(workoutId: $workoutId) {
    result {
      id
      activeWorkoutPlan
    }
    error {
      name
      message
    }
  }
}
`;