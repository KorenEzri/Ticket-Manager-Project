import React from "react";
import { Route, Redirect } from "react-router-dom";
import network from "../../../network";
export default function PrivateRoute({
  component,
  path,
  exact,
  ticketList,
  setTicketList,
}) {
  let isValidated;

  const validateCookieValue = async (value) => {
    isValidated = await network.get(`/api/usermanagement/${value}`);
  };
  const validateCookie = (document.cookie.match(
    /^(?:.*;)?\s*loggedIn\s*=\s*([^;]+)(?:.*)?$/
  ) || [, null])[1];

  if (validateCookie) {
    validateCookieValue(validateCookie);
  }
  const condition = isValidated;
  return condition ? (
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
