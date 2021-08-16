import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { getUserId } from "./auth";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  cors: false,
  context: ({ req }) => {
    return {
      ...req,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
});

await apolloServer.start();

var corsOptions = {
  origin: "*",
  credentials: false, // <-- REQUIRED backend setting
};

apolloServer.applyMiddleware({
  app,
  path: "/graphql",
});

app.use(cors(corsOptions));

app.listen(4000, () => {
  console.log(`Server is running`);
});
