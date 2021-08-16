import { testConnection } from "./database";
import { login, signup, testAuthentication, getUserDetails } from "./auth";
import { createWorkoutPlan } from "./workoutResolvers";

const testConnectionResolver = async (name) => {
  await testConnection(name);
  return name;
};

export const resolvers = {
  Query: {
    info: () => `This is the API of a Fitness Recorder App`,
    testConnection: (parent, args) => testConnectionResolver(args.name),
    testAuthentication: testAuthentication,
    getUserDetails: getUserDetails,
  },
  Mutation: {
    signup: signup,
    login: login,
    createWorkoutPlan: createWorkoutPlan,
  },
};
