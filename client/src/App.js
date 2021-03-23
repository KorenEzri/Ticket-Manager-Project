import React from "react";
import Homepage from "./components/pages/Homepage/index";
import Navbar from "./components/Navbar/index";
import Footer from "./components/Footer/index";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="wrapper">
      <div className="main">
        <Navbar />
        <Router>
          <Switch>
            <Route path="/">
              <Homepage />
            </Route>
          </Switch>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
