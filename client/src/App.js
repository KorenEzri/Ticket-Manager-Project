import React from "react";
import "./App.css";
import Homepage from "./components/pages/Homepage/index";
import RegisterPage from "./components/pages/Register/index";
import Login from "./components/pages/Login/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/pages/PrivateRoute/index";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "/graphql",
  credentials: "include",
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="wrapper">
        <div className="main">
          <Router>
            <Switch>
              <Route path="/register">
                <RegisterPage />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <PrivateRoute path="/" component={Homepage} exact />
              <Homepage />
            </Switch>
          </Router>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
