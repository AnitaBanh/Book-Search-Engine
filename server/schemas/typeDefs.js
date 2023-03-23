const { gql } = require('apollo-server-express');

const typeDefs= gql `
type Auth {
    token: ID!
    user: User
  }
type Query{
    me: User
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook (authors: [String!], description: String!, title:String!, bookId: String!, image: String!, link: String!): User
    removeBook(bookId: ID!): User
  }`

  module.exports = typeDefs;
