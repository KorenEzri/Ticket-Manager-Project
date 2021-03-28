import React from "react";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LockIcon from "@material-ui/icons/Lock";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HowToUserAuth from "../../ExplainerCards/HowToUserAuth/index";
import classNames from "classnames";
import { useState, useRef } from "react";
import network from "../../../network";
import "./Login.css";
const baseUrl = `/api/communications`;

export default function LoginPage() {
  const createValidationKey = async (username) => {
    await network.post(`${baseUrl}/initvalidation`, { username: username });
  };
  const requestAndSendValidationKey = async (username) => {
    await network.put(`${baseUrl}/requestvalidation`, {
      username: username,
    });
  };

  const [toggleKeySent, setToggleKeySent] = useState(false);
  const [textInput, setTextInput] = useState("");
  const helperRef = useRef(null);

  const HandleTextChange = (event) => {
    setTextInput(event.target.value);
  };

  return (
    <div>
      <div
        className={classNames({
          "explainer-edit": true,
          bounceInUp: true,
        })}
        ref={helperRef}
      >
        <HowToUserAuth helperRef={helperRef} />
      </div>
      <form action="/api/usermanagement/login" method="post" autocomplete="off">
        <div className="testbox">
          <h1>Employee Login</h1>
          <div className="user-info">
            <input
              type="text"
              name="username"
              onChange={HandleTextChange}
              placeholder="Username"
              required
              autocomplete="off"
            />
            <AccountCircleIcon className="icons" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              autocomplete="off"
            />
            <LockIcon className="icons" />
            <input
              type="password"
              name="validation"
              placeholder="Company Validation Key"
              required
              autocomplete="off"
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
