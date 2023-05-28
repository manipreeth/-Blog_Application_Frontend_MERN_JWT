// Import required modules
import React, { useState, useContext } from "react";
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
  const [offcanvasExpanded, setOffcanvasExpanded] = useState(false);

  // Use useNavigate hook for navigation
  const navigate = useNavigate();

  // Create a function called Logout which will log the user out when clicked
  const Logout = () => {
    // Send JSON Web Token which is stored in LocalStorage for Authorization
    const token = localStorage.getItem("token");
    axios
      .get("https://blog-application-backend-5dvk.onrender.com/users/logout", {
        // Set Authorization header to include the token
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        localStorage.removeItem("token");
        handleNavState(!navState);
        navigate("/");
      })
      .catch((err) => alert(err.response.data.message));
  };

  const handleOffcanvasClose = () => {
    setOffcanvasExpanded(false);
  };

  // Render the NavigationBar component
  return (
    <div className="navigationBar">
      <Navbar key="lg" expand="lg" className="mb-5">
        <Container fluid>
          <Navbar.Brand>
            <span className="navLogo">
              <img src={BSLogo} width="40px" height="40px" alt="coderblog" />
              <span className="ms-1 text-white ">BlogoSphere</span>
            </span>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="offcanvasNavbar-expand-lg"
            className="bg-light"
            onClick={() => setOffcanvasExpanded(true)}
          />
          <Navbar.Collapse
            id="offcanvasNavbar-expand-lg"
            aria-labelledby="offcanvasNavbarLabel-expand-lg"
            placement="end"
          >
            <Nav className="justify-content-end flex-grow-1 pe-3 navlinks d-none d-lg-flex">
              {navState ? (
                // If navState is true, show the following links in navigation bar
                <nav>
                  <NavLink
                    onClick={handleOffcanvasClose}
                    className="me-3 p-3 ps-4 pe-4 "
                    to="/"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    onClick={handleOffcanvasClose}
                    className="me-3 p-3 ps-4 pe-4 "
                    to="/posts"
                  >
                    My Posts
                  </NavLink>
                  <NavLink
                    onClick={handleOffcanvasClose}
                    className="me-3 p-3 ps-4 pe-4 "
                    to="/createPost"
                  >
                    Create Post
                  </NavLink>
                  <NavLink
                    onClick={handleOffcanvasClose}
                    className="me-3 me-md-4 p-3 ps-4 pe-4 "
                    to="/profile"
                  >
                    Profile
                  </NavLink>
                  <button
                    className="btn btn-danger mb-3 logoutBtn"
                    onClick={() => {
                      Logout();
                      handleOffcanvasClose();
                    }}
                  >
                    Logout
                  </button>
                </nav>
              ) : (
                // If navState is false, show the following links in navigation bar
                <nav>
                  <NavLink
                    onClick={handleOffcanvasClose}
                    className="me-3 p-2 ps-4 pe-4 "
                    to="/"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    onClick={handleOffcanvasClose}
                    className="me-2 p-2 ps-4 pe-4 "
                    to="/login"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    onClick={handleOffcanvasClose}
                    className="me-2 p-2 ps-4 pe-4 "
                    to="/register"
                  >
                    Register
                  </NavLink>
                </nav>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Offcanvas
        show={offcanvasExpanded}
        onHide={() => handleOffcanvasClose(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title
            id="offcanvasNavbarLabel-expand-lg"
            className="tc-orange fw-bolder"
          >
            &lt;/&gt;BlogoSphere
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <Nav className="justify-content-center flex-grow-1 pe-3 navlinks d-lg-flex">
            {navState ? (
              // If navState is true, show the following links in navigation bar
              <nav>
                <NavLink
                  onClick={handleOffcanvasClose}
                  className="me-3 p-3 ps-4 pe-4 "
                  to="/"
                >
                  Home
                </NavLink>
                <NavLink
                  onClick={handleOffcanvasClose}
                  className="me-3 p-3 ps-4 pe-4 "
                  to="/posts"
                >
                  My Posts
                </NavLink>
                <NavLink
                  onClick={handleOffcanvasClose}
                  className="me-3 p-3 ps-4 pe-4 "
                  to="/createPost"
                >
                  Create Post
                </NavLink>
                <NavLink
                  onClick={handleOffcanvasClose}
                  className="me-3 me-md-4 p-3 ps-4 pe-4 "
                  to="/profile"
                >
                  Profile
                </NavLink>
                <button
                  className="btn btn-danger mb-3 logoutBtn"
                  onClick={() => {
                    Logout();
                    handleOffcanvasClose();
                  }}
                >
                  Logout
                </button>
              </nav>
            ) : (
              // If navState is false, show the following links in navigation bar
              <nav>
                <NavLink
                  onClick={handleOffcanvasClose}
                  className="me-3 p-2 ps-4 pe-4 "
                  to="/"
                >
                  Home
                </NavLink>
                <NavLink
                  onClick={handleOffcanvasClose}
                  className="me-2 p-2 ps-4 pe-4 "
                  to="/login"
                >
                  Login
                </NavLink>
                <NavLink
                  onClick={handleOffcanvasClose}
                  className="me-2 p-2 ps-4 pe-4 "
                  to="/register"
                >
                  Register
                </NavLink>
              </nav>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default NavigationBar;
