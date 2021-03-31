const { gql } = require("apollo-server-express");
const { GraphQLObjectType } = require("graphql");

const typeDefs = gql`
  enum ListName {
    GROCERY
    BASKET
  }
  type listitemObj {
    item: String
    amount: Int
    isBought: Boolean
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
