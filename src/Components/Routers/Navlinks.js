import React, { useContext } from "react";
import axios from "axios";

import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";

// import context from App.js
import { ParentContext } from "../../App";
import { OffcanvasContext } from "./Navbar";

function Navlinks() {
  // Use useContext to access the parent context and useState hook for nav state
  const context = useContext(ParentContext);
  const [navState, handleNavState] = context.nav;

  // Use useContext to access the offcanvas context
  const context2 = useContext(OffcanvasContext);
  const [offcanvasExpanded, setOffcanvasExpanded] = context2;

  const navigate = useNavigate();

  // Create a function called Logout which will log the user out when clicked
  const Logout = () => {
    // Send JSON Web Token which is stored in LocalStorage for Authorization
    const token = localStorage.getItem("Blogospheretoken");
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
  return (
    <>
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
    </>
  );
}

export default Navlinks;
