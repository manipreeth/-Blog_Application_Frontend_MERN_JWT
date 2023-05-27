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
  const [registerbtnLabel, handleregisterbtnLabel] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);

  // handling user input data and updating state variables
  const handleRegisterForm = (e) => {
    handleregisterDetails({
      ...registerDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Handle the form submission
  const Register = (event) => {
    event.preventDefault();
    setBtnClicked(true);

    const { fullname, email, password, confirmPassword, mobile } =
      registerDetails;

    // toggling button label to show loader message label
    handleregisterbtnLabel(true);

    // checking if password and confirm password are same or not
    if (password !== confirmPassword) {
      alert("Password and Confirm password does not match");
    } else {
      // making post request to register user
      axios
        .post(
          "https://blog-application-backend-5dvk.onrender.com/users/register",
          {
            fullname: fullname,
            email: email,
            password: password,
            mobile: mobile,
          }
        )
        .then((res) => {
          setBtnClicked(false);
          handleregisterbtnLabel(false);

          if (res.data.data) {
            // redirecting to verify account page on successful registration
            navigate(`/verifyaccount?userid=${res.data.data}`);
          } else if (res.data.userId) {
            alert("Please Verify Your Account By OTP Sent To Your Mail");
            navigate(`/verifyaccount?userid=${res.data.userId}`);
          } else {
            alert("Something went wrong");
          }
        })
        .catch((err) => {
          setBtnClicked(false);
          handleregisterbtnLabel(false);

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
            placeholder="Enter your fullname"
            className="mb-30"
            id="name"
            maxLength="15"
            required
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
            maxLength="50"
            required
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
            maxLength="15"
            required
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            value={registerDetails.confirmPassword}
            name="confirmPassword"
            onChange={(e) => handleRegisterForm(e)}
            placeholder="Re-type your password"
            id="confirmPassword"
            className="mb-30"
            maxLength="15"
            required
          />

          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="tel"
            value={registerDetails.mobile}
            name="mobile"
            onChange={(e) => handleRegisterForm(e)}
            placeholder="Enter your mobile number"
            id="mobile"
            className="mb-30"
            maxLength="10"
            required
          />

          {registerDetails.fullname &&
          registerDetails.email &&
          registerDetails.password &&
          registerDetails.confirmPassword &&
          registerDetails.mobile ? (
            <button onClick={Register} disabled={btnClicked}>
              {registerbtnLabel ? "Setting up your space..." : "Register"}
            </button>
          ) : (
            <button>Register</button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Register;
