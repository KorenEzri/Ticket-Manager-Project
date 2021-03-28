import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import network from "../../../network";

export default function PrivateRoute({
  component,
  path,
  exact,
  ticketList,
  setTicketList,
}) {
  const validateCookie = (document.cookie.match(
    /^(?:.*;)?\s*loggedIn\s*=\s*([^;]+)(?:.*)?$/
  ) || [, null])[1];
  const [isValidated, setIsValidated] = useState(validateCookie);

  const validateCookies = async () => {
    if (isValidated === null) return false;
    const { data } = await network.get(`/api/usermanagement/${validateCookie}`);
    return data;
  };

  setTimeout(() => {
    validateCookies();
  }, 3000);

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
