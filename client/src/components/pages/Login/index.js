import React from "react";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import classNames from "classnames";
import { useState } from "react";
import network from "../../../network";
import "./Login.css";
const baseUrl = `/api/communications`;

export default function LoginPage() {
  const createValidationKey = async (username) => {
    await network.post(`${baseUrl}/initvalidation`, { username: username });
  };
  const requestAndSendValidationKey = async (username, email) => {
    await network.put(`${baseUrl}/requestvalidation`, {
      email: email,
      username: username,
    });
  };

  const [toggleEmailInput, setToggleEmailInput] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [textInput, setTextInput] = useState("");

  const HandleMailChange = (event) => {
    setEmailInput(event.target.value);
  };
  const HandleTextChange = (event) => {
    setTextInput(event.target.value);
  };

  return (
    <div>
      <form action="/api/usermanagement/login" method="put" autocomplete="off">
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
              "request-key-button": !toggleEmailInput,
              "send-key-button": toggleEmailInput,
            })}
            type="button"
            onClick={async (e) => {
              if (!toggleEmailInput) {
                if (!textInput) {
                  alert("Please enter your username!");
                  return;
                }
                e.target.innerText = "Request";
                await createValidationKey(textInput);
                setToggleEmailInput(true);
              } else if (toggleEmailInput) {
                if (!emailInput) {
                  alert("Please enter your email address!");
                  return;
                }
                if (!textInput) {
                  alert("Please enter your username!");
                  return;
                }
                await requestAndSendValidationKey(textInput, emailInput);
              }
            }}
          >
            Request Key
          </button>
          {toggleEmailInput && (
            <form className="submit-validation-key">
              <div className="email-required">
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  required
                  onChange={HandleMailChange}
                />
                <EmailIcon className="icons" />
              </div>
            </form>
          )}
        </div>
      </form>
    </div>
  );
}
