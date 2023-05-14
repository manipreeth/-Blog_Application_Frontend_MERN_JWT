import React, { useState, useContext } from "react";
import axios from "axios";

import { useNavigate } from "react-router";
import { ParentContext } from "../../App";

import "./login.css";
import Logo from "./Logo";

function LoginForm() {
  // Using context to handle navigation state
  const context = useContext(ParentContext);
  const [navState, handleNavState] = context.nav;

  // Using react-router's navigate function to redirect on successful login
  const navigate = useNavigate();

  // Using state to handle user input
  const [loginDetails, handleLoginDetails] = useState({
    email: "",
    password: "",
  });

  // Function to handle user input changes
  const handleLoginForm = (e) => {
    handleLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Function to make login request and handle response
  const login = () => {
    return axios
      .post("/users/login", {
        email: loginDetails.email,
        password: loginDetails.password,
      })
      .then((res) => {
        // Setting login status to true
        // After successful login
        const token = res.data.token;
        localStorage.setItem("token", token);

        handleNavState(!navState);
        navigate("/");
      })
      .catch((err) => {
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
          />
          <label className="pswdLabel">Password</label>
          <input
            type="password"
            value={loginDetails.password}
            name="password"
            onChange={(e) => handleLoginForm(e)}
            placeholder="***************"
          />
        </form>
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}

export default LoginForm;
