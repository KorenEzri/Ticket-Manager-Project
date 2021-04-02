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

const searchTickets = gql`
  query searchTickets($input: String) {
    searchTickets(input: $input) {
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

const requestAndSendValidationKey = gql`
  query requestAndSendValidationKey($username: String) {
    requestAndSendValidationKey(username: $username)
  }
`;

const login = gql`
  query login($username: String, $password: String) {
    login(username: $username, password: $password)
  }
`;

const createValidationKey = gql`
  mutation createValidationKey($username: String) {
    createValidationKey(username: $username)
  }
`;

export default {
  allTickets,
  searchTickets,
  createValidationKey,
  requestAndSendValidationKey,
  login,
};
