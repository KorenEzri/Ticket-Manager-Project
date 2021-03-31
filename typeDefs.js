const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date
  type listitemObj {
    title: String
  content: String
  correspondences: []
  userEmail: String
  done: Boolean
  creationTime: Date
  lastUpdated: Date
  labels: []
  correspondences: []
  }
  type User {
    firstName: String
  lastName: String
  username: String
  password: String
  birthday: String
  lastLogin: Date
  }
  type Cookie {
    cookie String 
  value: Int
  createdAt: Date
  }
  type ValidationKey {
    key: String
  username: String
  createdAt:  Date
  }
  type Query {
    allListItems(list: ListName): [listitemObj]
  }
  type Mutation {
    addGroceryItem(item: String): [listitemObj!]
    addBasketItem(item: String): [listitemObj!]
    clearList(list: ListName): String
    deleteOne(list: ListName, item: String): [listitemObj]
    toggleBought(item: String): [listitemObj!]
  }
`;

module.exports = { typeDefs };
