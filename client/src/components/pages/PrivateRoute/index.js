import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({
  component,
  path,
  exact,
  ticketList,
  setTicketList,
}) {
  const cookies = document.cookie;
  console.log(cookies);
  const condition = true;
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
