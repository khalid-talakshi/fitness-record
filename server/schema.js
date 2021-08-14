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

type Query {
  info: String!
  testConnection(name: String!): String!
}

type Mutation {
  signup(name: String!, email: String!, password: String!): AuthPayload
}
`;
