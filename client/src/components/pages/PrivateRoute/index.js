import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useState } from "react";
import apolloUtils from "../../../apollo-client/apollo-utils";
import { useApolloClient } from "@apollo/client";

export default function PrivateRoute({
  component,
  path,
  exact,
  ticketList,
  setTicketList,
}) {
  const client = useApolloClient();
  const validateCookie = (document.cookie.match(
    /^(?:.*;)?\s*loggedIn\s*=\s*([^;]+)(?:.*)?$/
  ) || [, null])[1];
  const [isValidated, setIsValidated] = useState(validateCookie);

  const validateCookies = async () => {
    if (isValidated === null) return false;
    try {
      const {
        data: { checkCookies },
      } = await client.query({
        query: apolloUtils.checkCookies,
        variables: { cookie: validateCookie },
      });
      setIsValidated(checkCookies);
    } catch ({ message }) {
      console.log(message);
    }
  };

  setTimeout(() => {
    validateCookies();
  }, 600);

  return isValidated ? (
    <Route
      path={path}
      exact={exact}
      component={component}
      ticketList={ticketList}
      setTicketList={setTicketList}
    />
  ) : (
    <Redirect to="/login" />
  );
}
