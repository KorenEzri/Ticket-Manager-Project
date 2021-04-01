const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date
  type ticketItem {
    title: String
    content: String
    correspondences: [String]
    userEmail: String
    done: Boolean
    creationTime: Date
    lastUpdated: Date
    labels: [String]
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
    cookie: String
    value: Int
    createdAt: Date
  }
  type ValidationKey {
    key: String
    username: String
    createdAt: Date
  }
  type Query {
    allTickets: [ticketItem]
    searchTickets(input: String): [ticketItem]
    requestAndSendValidationKey(username: String): String
  }
  type Mutation {
    createValidationKey(username: String): String

    #   addGroceryItem(item: String): [ticketItem!]
    #   addBasketItem(item: String): [ticketItem!]
    #   clearList(list: ListName): String
    #   deleteOne(list: ListName, item: String): [ticketItem]
    #   toggleBought(item: String): [ticketItem!]
  }
`;

module.exports = { typeDefs };
