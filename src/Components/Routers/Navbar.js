// Import required modules
import React, { useContext } from "react";
import axios from "axios";
import "./navbar.css";

import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

import BSLogo from "../../Assets/Images/bs.png";

// import context from App.js
import { ParentContext } from "../../App";

// Creating a functional component called NavigationBar
function NavigationBar() {
  // Use useContext to access the parent context and useState hook for nav state
  const context = useContext(ParentContext);
  const [navState, handleNavState] = context.nav;

  // Use useNavigate hook for navigation
  const navigate = useNavigate();

  // Create a function called Logout which will log the user out when clicked
  const Logout = () => {
    // Send JSON Web Token which is stored in LocalStorage for Authorization
    const token = localStorage.getItem("token");
    axios
      .get("/users/logout", {
        // Set Authorization header to include the token
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        localStorage.removeItem("token");
        handleNavState(!navState);
        navigate("/");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  // Render the NavigationBar component
  return (
    <div className="navigationBar">
      <Navbar key="lg" expand="lg" className="mb-5">
        <Container fluid>
          <Navbar.Brand href="/">
            <span className="navLogo">
              <img src={BSLogo} width="40px" height="40px" alt="coderblog" />
              <span className="ms-1 text-white ">BlogoSphere</span>
            </span>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="offcanvasNavbar-expand-lg"
            className="bg-light"
          />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-lg"
            aria-labelledby="offcanvasNavbarLabel-expand-lg"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
                &lt;/&gt;BlogoSphere
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3 navlinks">
                {navState ? (
                  // If navState is true, show the following links in navigation bar
                  <nav>
                    <NavLink className="me-3 p-3 ps-4 pe-4 " to="/">
                      Home
                    </NavLink>
                    <NavLink className="me-3 p-3 ps-4 pe-4 " to="/posts">
                      My Posts
                    </NavLink>
                    <NavLink className="me-3 p-3 ps-4 pe-4 " to="/createPost">
                      Create Post
                    </NavLink>
                    <NavLink
                      className="me-3 me-md-5 p-3 ps-4 pe-4 "
                      to="/profile"
                    >
                      Profile
                    </NavLink>
                    <button
                      className="btn btn-danger mb-3 logoutBtn"
                      onClick={Logout}
                    >
                      Logout
                    </button>
                  </nav>
                ) : (
                  // If navState is false, show the following links in navigation bar
                  <nav>
                    <NavLink className="me-3 p-2 ps-4 pe-4 " to="/">
                      Home
                    </NavLink>
                    <NavLink className="me-2 p-2 ps-4 pe-4 " to="/login">
                      Login
                    </NavLink>
                    <NavLink className="me-2 p-2 ps-4 pe-4 " to="/register">
                      Register
                    </NavLink>
                  </nav>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
