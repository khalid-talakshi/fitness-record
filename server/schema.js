export const typeDefs = `
type User {
  id: ID!
  name: String
  email: String
  activeWorkoutPlan: ID
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
  createdBy: ID!
  workouts: [Workout]!
  active: Boolean!
}

type GenericError {
  name: String!
  message: String!
}

type WorkoutPlanWithError {
  result: WorkoutPlan
  error: GenericError
}

type WorkoutPlansWithError {
  result: [WorkoutPlan]
  error: GenericError
}

type UserWithError {
  result: User
  error: GenericError
}

type Query {
  info: String!
  testConnection(name: String!): String!
  testAuthentication: String
  getUserDetails: User
  getWorkoutPlans: [WorkoutPlan]
}

type Mutation {
  signup(name: String!, email: String!, password: String!): AuthPayloadWithError
  login(email: String!, password: String!): AuthPayloadWithError
  createWorkoutPlan(name: String!): WorkoutPlanWithError
  setActiveWorkout(workoutId: String!): UserWithError
  deleteWorkoutPlan(workoutId: String!): WorkoutPlansWithError
}
`;
