import React from "react";
import "./Register.css";
import EmailIcon from "@material-ui/icons/Email";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LockIcon from "@material-ui/icons/Lock";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import CakeIcon from "@material-ui/icons/Cake";
import GroupIcon from "@material-ui/icons/Group";

export default function RegisterPage() {
  return (
    <form action="/api/usermanagement/register" method="post">
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
          <label for="radioOne" className="radio" chec>
            Personal
          </label>
          <input type="radio" value="None" id="radioTwo" name="account" />
          <label for="radioTwo" className="radio">
            Company
          </label>
        </div>
        <div className="user-info">
          <input type="text" name="email" placeholder="Email" required />
          <EmailIcon className="icons" />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required
          />
          <PermIdentityIcon className="icons" />
          <input type="text" name="lastName" placeholder="Last Name" required />
          <GroupIcon className="icons" />
          <input
            type="text"
            name="birthday"
            placeholder="Birthday: yy/mm/dddd"
            required
          />
          <CakeIcon className="icons" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <LockIcon className="icons" />
        </div>
        <div className="gender">
          <input type="radio" value="None" id="male" name="gender" checked />
          <label for="male" className="radio" chec>
            Male
          </label>
          <input type="radio" value="None" id="female" name="gender" />
          <label for="female" className="radio">
            Female
          </label>
        </div>
        <button className="button" type="submit">
          Register
        </button>
      </div>
    </form>
  );
}
