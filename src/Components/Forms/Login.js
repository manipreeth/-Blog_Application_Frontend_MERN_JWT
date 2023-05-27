import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router";

import "./login.css";
import Logo from "./Logo";

function LoginForm() {
  // Using react-router's navigate function to redirect on successful login
  const navigate = useNavigate();

  // Using state to handle user input
  const [loginDetails, handleLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [loginBtnLabel, setLoginBtnLabel] = useState(true);
  const [btnClicked, setBtnClicked] = useState(false);

  // Function to handle user input changes
  const handleLoginForm = (e) => {
    handleLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Function to make login request and handle response
  const login = async (event) => {
    event.preventDefault();

    setBtnClicked(true);

    // Display "Logging in..." in login button
    setLoginBtnLabel(false);

    return await axios
      .post("https://blog-application-backend-5dvk.onrender.com/users/login", {
        email: loginDetails.email,
        password: loginDetails.password,
      })
      .then((res) => {
        setBtnClicked(false);

        if (res.data.user) {
          // After successful login
          // Redirect to validate otp page
          navigate(`/otpvalidation?userid=${res.data.user}`);
        } else if (res.data.userId) {
          // Display an alert asking the user to verify their account
          alert("Please Verify Your Account By OTP Sent To Your Mail");

          // Redirect the user to the verify account page, passing the user ID as a query parameter
          navigate(`/verifyaccount?userid=${res.data.userId}`);
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => {
        setBtnClicked(false);
        // Display "Logging in..." in login button
        setLoginBtnLabel(true);
        // Alert the original error message
        alert(err.response.data.message);
      });
  };

  return (
    <div className="login">
      <div className="d-none d-md-block">
        <Logo />
      </div>
      <div className="loginDiv">
        <h1 className="loginH tc-orange">Login</h1>
        <form className="loginForm">
          <label>Email Id</label>
          <input
            type="email"
            value={loginDetails.email}
            name="email"
            onChange={(e) => handleLoginForm(e)}
            placeholder="exmaple@xyz.com"
            className="mb-30"
            required
          />
          <label className="pswdLabel">Password</label>
          <input
            type="password"
            value={loginDetails.password}
            name="password"
            onChange={(e) => handleLoginForm(e)}
            placeholder="***************"
            required
          />
          {loginDetails.email && loginDetails.password ? (
            <button onClick={login} disabled={btnClicked}>
              {loginBtnLabel ? "Login" : "Logging in..."}
            </button>
          ) : (
            <button>Login</button>
          )}
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
