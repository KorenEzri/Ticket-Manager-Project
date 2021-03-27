import React from "react";
import "./App.css";
import Homepage from "./components/pages/Homepage/index";
import RegisterPage from "./components/pages/Register/index";
import Login from "./components/pages/Login/index";
import Navbar from "./components/Navbar/index";
import Footer from "./components/Footer/index";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [ticketList, setTicketList] = useState([]);
  return (
    <div className="wrapper">
      <div className="main">
        <Navbar setTicketList={setTicketList} />
        <Router>
          <Switch>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Homepage ticketList={ticketList} setTicketList={setTicketList} />
            </Route>
          </Switch>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
