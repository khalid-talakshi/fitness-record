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

type Query {
  info: String!
  testConnection(name: String!): String!
  testAuthentication: String
}

type Mutation {
  signup(name: String!, email: String!, password: String!): AuthPayloadWithError
  login(email: String!, password: String!): AuthPayloadWithError
}
`;
