import { testConnection } from "./database/database";

const testConnectionResolver = async () => {
  await testConnection("admin");
  return "admin";
};

export const resolvers = {
  Query: {
    info: () => `This is the API of a Fitness Recorder App`,
    testConnection: testConnectionResolver,
  },
};
