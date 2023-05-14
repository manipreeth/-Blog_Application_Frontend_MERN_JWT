import React, { useState } from "react";
import { useNavigate } from "react-router";

import Logo from "./Logo";
import axios from "axios";

function Register() {
  // using the useNavigate hook to navigate between different pages
  const navigate = useNavigate();

  // declaring state variables to store user input data
  const [registerDetails, handleregisterDetails] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  });

  // declaring state variables to manage button label and loader
  const [registerbtnLabel, handleregisterbtnLabel] = useState(true);

  // handling user input data and updating state variables
  const handleRegisterForm = (e) => {
    handleregisterDetails({
      ...registerDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Handle the form submission
  const Register = (event) => {
    const { fullname, email, password, confirmPassword, mobile } =
      registerDetails;

    // toggling button label to show loader
    handleregisterbtnLabel(!registerbtnLabel);

    // checking if password and confirm password are same or not
    if (password !== confirmPassword) {
      alert("Password and Confirm password does not match");
    } else {
      // making post request to register user
      axios
        .post("/users/register", {
          fullname: fullname,
          email: email,
          password: password,
          mobile: mobile,
        })
        .then((res) => {
          // redirecting to login page on successful registration
          navigate("/login");
          alert(res.data.status);
        })
        .catch((err) => {
          // displaying error message on failed registration
          alert(err.response.data.message);
        });
    }
  };

  return (
    <div className="login">
      {/* Render the logo component */}
      <div className="d-none d-md-block">
        <Logo />
      </div>
      <div className="registerDiv">
        <h1 className="loginH tc-orange">Register</h1>
        <form className="loginForm">
          {/* Render the input fields for full name, email, password, confirm password, and mobile number */}
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            value={registerDetails.fullname}
            name="fullname"
            onChange={(e) => handleRegisterForm(e)}
            placeholder="Manipreeth"
            className="mb-30"
            id="name"
            maxLength="15"
          />
          <label htmlFor="email">Email Id</label>
          <input
            type="email"
            value={registerDetails.email}
            name="email"
            onChange={(e) => handleRegisterForm(e)}
            placeholder="exmaple@xyz.com"
            className="mb-30"
            id="email"
            maxLength="20"
          />
          <label htmlFor="pswd">Password</label>
          <input
            type="password"
            value={registerDetails.password}
            name="password"
            onChange={(e) => handleRegisterForm(e)}
            placeholder="***************"
            id="pswd"
            className="mb-30"
            maxLength="13"
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="text"
            value={registerDetails.confirmPassword}
            name="confirmPassword"
            onChange={(e) => handleRegisterForm(e)}
            placeholder="Re-type your password"
            id="confirmPassword"
            className="mb-30"
            maxLength="13"
          />

          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="number"
            value={registerDetails.mobile}
            name="mobile"
            onChange={(e) => handleRegisterForm(e)}
            placeholder="9876543210"
            id="mobile"
            className="mb-30"
            size="10"
            min="0"
          />
        </form>

        <button onClick={Register}>
          {registerbtnLabel ? "Register" : "Setting up your space..."}
        </button>
      </div>
    </div>
  );
}

export default Register;
