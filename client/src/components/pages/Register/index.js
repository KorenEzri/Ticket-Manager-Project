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
export default function RegisterPage() {
  const [checked, setChecked] = React.useState(true);
  return (
    <div>
      <Navbar />
      <form
        action="/api/usermanagement/register"
        method="post"
        autocomplete="off"
      >
        <div className="testbox">
          <h1>Registration</h1>
          <div className="accounttype">
            <input
              type="radio"
              value="None"
              id="radioOne"
              name="account"
              checked
            />
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
              autocomplete="off"
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
              autocomplete="off"
              placeholder="Username (unique)"
              required
            />
            <AccountCircleIcon className="icons" />
            <input
              type="password"
              autocomplete="off"
              name="password"
              placeholder="Password"
              required
            />
            <LockIcon className="icons" />
          </div>
          <div className="gender">
            <input type="radio" value="None" id="male" name="gender" checked />
            <FormControlLabel
              value="end"
              autocomplete="off"
              control={<Checkbox color="primary" />}
              label="Female"
              labelPlacement="end"
            />
            <input type="radio" value="None" id="female" name="gender" />
            <FormControlLabel
              value="end"
              autocomplete="off"
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
  );
}
