import React from "react";
import "./App.css";
import Homepage from "./components/pages/Homepage/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="wrapper">
      <div className="main">
        <Router>
          <Switch>
            <Homepage />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
