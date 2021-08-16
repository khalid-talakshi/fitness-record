export const typeDefs = `
type User {
  id: ID!
  name: String
  email: String
}

type AuthPayload {
  token: String
  user: User
}

type Error {
  name: String
  message: String
}

type AuthPayloadWithError {
  result: AuthPayload
  error: Error
}

type Workout {
  name: String!
  reps: Int!
  set: Int!
}

type WorkoutPlan {
  id: ID!
  name: String!
  createdBy: String!
  workouts: [Workout]!
}

type GenericError {
  name: String!
  message: String!
}

type WorkoutPlanWithError {
  result: WorkoutPlan
  error: GenericError
}

type Query {
  info: String!
  testConnection(name: String!): String!
  testAuthentication: String
  getUserDetails: User
}

type Mutation {
  signup(name: String!, email: String!, password: String!): AuthPayloadWithError
  login(email: String!, password: String!): AuthPayloadWithError
  createWorkoutPlan(name: String!): WorkoutPlanWithError
}
`;
