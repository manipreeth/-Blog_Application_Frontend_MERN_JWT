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

    const { fullname, email, password, confirmPassword, mobile } =
      registerDetails;

    // Trimmed inputs
    const trimmedFullname = fullname.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();
    const trimmedMobile = mobile.trim();

    // Validate trimmed inputs
    let errorMessage = "";

    switch (true) {
      // Check if email includes @
      case trimmedEmail.includes("@") === false:
        errorMessage = "Please enter a valid email";
        break;

      // Check password length
      case trimmedPassword.length < 10:
        errorMessage = "Password must be at least 10 characters";
        break;

      // Check whether password and confirm password is same or not
      case trimmedPassword !== trimmedConfirmPassword:
        errorMessage = "Passwords do not match";
        break;

      // Check if mobile is of 10 numbers legth
      case trimmedMobile.length !== 10:
        errorMessage = "Please enter a valid mobile number";
        break;

      // check if mobile number is valid according to reference of below numbers
      case trimmedMobile < "1000000000":
      case trimmedMobile === "1234567890":
      case trimmedMobile === "9876543210":
      case trimmedMobile === "5678901234":
      case trimmedMobile === "0000000000":
      case trimmedMobile === "1111111111":
      case trimmedMobile === "2222222222":
      case trimmedMobile === "3333333333":
      case trimmedMobile === "4444444444":
      case trimmedMobile === "5555555555":
      case trimmedMobile === "6666666666":
      case trimmedMobile === "7777777777":
      case trimmedMobile === "8888888888":
      case trimmedMobile === "9999999999":
        errorMessage = "Invalid mobile number";
        break;

      default:
        // if all validations are passed

        setBtnClicked(true);
        // toggling button label to show loader message label
        handleregisterbtnLabel(true);
        // making post request to register user
        axios
          .post(
            "https://blog-application-backend-5dvk.onrender.com/users/register",
            {
              fullname: trimmedFullname,
              email: trimmedEmail,
              password: trimmedPassword,
              mobile: trimmedMobile,
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

    // Display error message if validation fails
    if (errorMessage) {
      alert(errorMessage);
      return;
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
            minLength="10"
            maxLength="30"
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
            maxLength="40"
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
            minLength="10"
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
            minLength="10"
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
            min="1000000000"
            max="9999999999"
            minLength="10"
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
