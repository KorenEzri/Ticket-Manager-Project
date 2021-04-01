import React from "react";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LockIcon from "@material-ui/icons/Lock";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HowToUserAuth from "../../ExplainerCards/HowToUserAuth/index";
import Navbar from "../../Navbar/index";
import classNames from "classnames";
import { useState, useRef } from "react";
import apolloUtils from "../../../apollo-client/apollo-utils";
import { useApolloClient } from "@apollo/client";
import "./Login.css";

export default function LoginPage() {
  const client = useApolloClient();
  const createValidationKey = async (username) => {
    try {
      await client.mutate({
        mutation: apolloUtils.createValidationKey,
        variables: { username: username },
      });
    } catch ({ message }) {
      console.log(message);
    }
  };
  const requestAndSendValidationKey = async (username) => {
    try {
      await client.query({
        query: apolloUtils.requestAndSendValidationKey,
        variables: { username: username },
      });
    } catch ({ message }) {
      console.log(message);
    }
  };

  const [toggleKeySent, setToggleKeySent] = useState(false);
  const [textInput, setTextInput] = useState("");
  const helperRef = useRef(null);

  const HandleTextChange = (event) => {
    setTextInput(event.target.value);
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
      <form action={`${}`} method="post" autoComplete="off">
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
              required
              autoComplete="off"
            />
            <LockIcon className="icons" />
            <input
              type="password"
              name="validation"
              placeholder="Company Validation Key"
              required
              autoComplete="off"
            />
            <VpnKeyIcon className="icons" />
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
          <button
            className={classNames({
              "request-key-button": !toggleKeySent,
              "send-key-button": toggleKeySent,
            })}
            type="button"
            onClick={async (e) => {
              if (!toggleKeySent) {
                if (!textInput) {
                  alert("Please enter your username!");
                  return;
                }
                e.target.innerText = "Request";
                await createValidationKey(textInput);
                await requestAndSendValidationKey(textInput);
                setToggleKeySent(true);
              } else if (toggleKeySent) {
                if (!textInput) {
                  alert("Please enter your username!");
                  return;
                }
              }
            }}
          >
            Request Key
          </button>
          {toggleKeySent && (
            <p>
              An email with the validation key was sent to the admin address
              associated with your company. Please enter the key to continue.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
