import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.MONGODB_URL);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

apolloServer
  .listen()
  .then(({ url }) => console.log(`Server is running on ${url}`));
