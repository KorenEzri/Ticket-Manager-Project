import React from "react";
import LockIcon from "@material-ui/icons/Lock";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HowToUserAuth from "../../ExplainerCards/HowToUserAuth/index";
import Navbar from "../../Navbar/index";
import classNames from "classnames";
import { useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import apolloUtils from "../../../apollo-client/apollo-utils";
import { useApolloClient } from "@apollo/client";
import "./Login.css";

export default function LoginPage() {
  const client = useApolloClient();
  const [passwordInput, setPasswordInput] = useState("");
  const [textInput, setTextInput] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const helperRef = useRef(null);

  const HandleTextChange = (event) => {
    setTextInput(event.target.value);
  };
  const HandlePasswordChange = (event) => {
    setPasswordInput(event.target.value);
  };
  const sendLoginQuery = async (username, password, setter) => {
    if (username && password) {
      try {
        const {
          data: { login },
        } = await client.query({
          query: apolloUtils.login,
          variables: { username: username, password: password },
        });
        if (login !== "OK") {
          alert("Login failed");
        } else {
          setter(true);
        }
      } catch ({ message }) {
        console.log(message);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div
        className={classNames({
          "explainer-edit": true,
          bounceInUp: true,
        })}
        ref={helperRef}
      >
        <HowToUserAuth helperRef={helperRef} />
      </div>
      <form autoComplete="off">
        <div className="testbox">
          <h1>Employee Login</h1>
          <div className="user-info">
            <input
              type="text"
              name="username"
              onChange={HandleTextChange}
              placeholder="Username"
              required
              autoComplete="off"
            />
            <AccountCircleIcon className="icons" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={HandlePasswordChange}
              required
              autoComplete="off"
            />
            <LockIcon className="icons" />
          </div>
          <button
            className="login-button"
            type="button"
            onClick={async () => {
              await sendLoginQuery(textInput, passwordInput, setIsValidated);
            }}
          >
            Login
          </button>
          {isValidated && <Redirect to="/" />}
        </div>
      </form>
    </div>
  );
}
