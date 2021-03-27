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
  const createValidationKey = () => {
    // SEND REQUEST TO COMMUNICATIONS, COMMUNICATIONS CREATES AND SENDS VALIDATION KEY TO JSONDB
  };
  const requestAndSendValidationKey = () => {
    // SEND REQUEST TO COMMUNICATIONS, COMMUNICATIONS SENDS REQUEST TO JSONBIN, GETS KEY FROM JSONBIN, SENDS EMAIL TO USER
    network.get();
  };
  const [emailInput, requestEmailInput] = useState(false);
  return (
    <div>
      <form action="/api/usermanagement/login" method="put" autocomplete="off">
        <div className="testbox">
          <h1>Employee Login</h1>
          <div className="user-info">
            <input
              type="text"
              name="username"
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
              "request-key-button": !emailInput,
              "send-key-button": emailInput,
            })}
            type="button"
            onClick={async (e) => {
              if (!emailInput) {
                await createValidationKey();
                requestEmailInput(true);
                e.target.innerText = "Request";
              } else if (emailInput) {
                await requestAndSendValidationKey();
              }
            }}
          >
            Request Key
          </button>
          {emailInput && (
            <form className="submit-validation-key">
              <div className="email-required">
                <input type="text" name="email" placeholder="Email" required />
                <EmailIcon className="icons" />
              </div>
            </form>
          )}
        </div>
      </form>
    </div>
  );
}
