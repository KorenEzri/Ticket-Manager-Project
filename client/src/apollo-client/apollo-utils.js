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

const checkCookies = gql`
  query checkCookies($cookie: String) {
    checkCookies(cookie: $cookie)
  }
`;

const login = gql`
  query login($username: String, $password: String) {
    login(username: $username, password: $password)
  }
`;

const register = gql`
  mutation register(
    $email: String
    $firstName: String
    $lastName: String
    $username: String
    $password: String
  ) {
    register(
      email: $email
      firstName: $firstName
      lastName: $lastName
      username: $username
      password: $password
    )
  }
`;

const updateTicket = gql`
  mutation updateTicket(
    $content: String
    $correspondences: [String]
    $done: Boolean
    $userEmail: String
    $labels: [String]
    $title: String
    $creationTime: Date
    $lastUpdated: Date
  ) {
    updateTicket(
      content: $content
      correspondences: $correspondences
      done: $done
      userEmail: $userEmail
      labels: $labels
      title: $title
      creationTime: $creationTime
      lastUpdated: $lastUpdated
    ) {
      content
      correspondences
      done
      userEmail
      labels
      title
      creationTime
      lastUpdated
    }
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
  register,
  checkCookies,
  updateTicket,
};
