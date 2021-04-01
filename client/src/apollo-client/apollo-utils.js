import { gql } from "@apollo/client";

//COMMUNICATION ROUTES

const allTickets = gql`
  query allTickets {
    allTickets {
      title
      content
      correspondences
      userEmail
      done
      creationTime
      lastUpdated
      labels
    }
  }
`;

const addNewGroceryItem = gql`
  mutation addGroceryItem($item: String) {
    addGroceryItem(item: $item) {
      item
    }
  }
`;

const addBasketItem = gql`
  mutation addBasketItem($item: String) {
    addBasketItem(item: $item) {
      item
      amount
      isBought
    }
  }
`;

const clearList = gql`
  mutation clearList($list: ListName) {
    clearList(list: $list)
  }
`;

const deleteOne = gql`
  mutation deleteOne($list: ListName, $item: String) {
    deleteOne(list: $list, item: $item) {
      item
      amount
      isBought
    }
  }
`;

const toggleBought = gql`
  mutation toggleBought($item: String) {
    toggleBought(item: $item) {
      item
      amount
      isBought
    }
  }
`;

export default {
  allTickets,
  addNewGroceryItem,
  addBasketItem,
  clearList,
  deleteOne,
  toggleBought,
};
