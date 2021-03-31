import { gql } from "@apollo/client";

//COMMUNICATION ROUTES

const allListItems = gql`
  query allListItems($list: ListName) {
    allListItems(list: $list) {
      item
      amount
      isBought
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
  allListItems,
  addNewGroceryItem,
  addBasketItem,
  clearList,
  deleteOne,
  toggleBought,
};
