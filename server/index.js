import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

await apolloServer.start();

apolloServer.applyMiddleware({
  app,
  path: "/graphql",
});

app.listen(4000, () => {
  console.log(`Server is running`);
});
