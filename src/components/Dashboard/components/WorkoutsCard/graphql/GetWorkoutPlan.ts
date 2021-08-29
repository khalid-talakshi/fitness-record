import gql from 'graphql-tag';

export const GET_WORKOUT_PLANS = gql`
  query getWorkoutPlans {
    getWorkoutPlans {
      id
      name
    }
  }
`;