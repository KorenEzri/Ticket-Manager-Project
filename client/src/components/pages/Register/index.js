import React from "react";
import "./Register.css";
import EmailIcon from "@material-ui/icons/Email";
import Navbar from "../../Navbar/index";
import LockIcon from "@material-ui/icons/Lock";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import GroupIcon from "@material-ui/icons/Group";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import apolloUtils from "../../../apollo-client/apollo-utils";
import { useApolloClient } from "@apollo/client";
import { Redirect } from "react-router-dom";

export default function RegisterPage() {
  const client = useApolloClient();
  const [checked, setChecked] = React.useState(true);
  const [isRegistered, setIsRegistered] = React.useState(false);
  const sendRegistrationMutation = async (event) => {
    try {
      const { email, firstName, lastName, username, password } = event.target;
      const {
        data: { register },
      } = await client.mutate({
        mutation: apolloUtils.register,
        variables: {
          email: email.value,
          firstName: firstName.value,
          lastName: lastName.value,
          username: username.value,
          password: password.value,
        },
      });
    } catch ({ message }) {
      console.log(message);
    }
  };

  return (
    <div>
      {isRegistered ? (
        <Redirect to="/login" />
      ) : (
        <div>
          <Navbar />
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              await sendRegistrationMutation(event);
              setIsRegistered(true);
            }}
          >
            <div className="testbox">
              <h1>Registration</h1>
              <div className="accounttype">
                <input type="radio" value="None" id="radioOne" name="account" />
                <FormControlLabel
                  value="end"
                  checked={checked}
                  control={<Checkbox color="primary" />}
                  label="Company"
                  labelPlacement="end"
                />
                <input type="radio" value="None" id="radioTwo" name="account" />
                <FormControlLabel
                  value="end"
                  control={<Checkbox color="primary" />}
                  label="Personal"
                  labelPlacement="end"
                  disabled
                  checked
                  inputProps={{ "aria-label": "disabled checked checkbox" }}
                />
              </div>
              <div className="user-info">
                <input type="text" name="email" placeholder="Email" required />
                <EmailIcon className="icons" />
                <input
                  type="text"
                  name="firstName"
                  autoComplete="off"
                  placeholder="First Name"
                  required
                />
                <PermIdentityIcon className="icons" />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  required
                />
                <GroupIcon className="icons" />
                <input
                  type="text"
                  name="username"
                  autoComplete="off"
                  placeholder="Username (unique)"
                  required
                />
                <AccountCircleIcon className="icons" />
                <input
                  type="password"
                  autoComplete="off"
                  name="password"
                  placeholder="Password"
                  required
                />
                <LockIcon className="icons" />
              </div>
              <div className="gender">
                <input
                  type="radio"
                  value="None"
                  id="male"
                  name="gender"
                  checked
                />
                <FormControlLabel
                  value="end"
                  autoComplete="off"
                  control={<Checkbox color="primary" />}
                  label="Female"
                  labelPlacement="end"
                />
                <input type="radio" value="None" id="female" name="gender" />
                <FormControlLabel
                  value="end"
                  autoComplete="off"
                  control={<Checkbox color="primary" />}
                  label="Male"
                  labelPlacement="end"
                />
              </div>
              <button className="button" type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
