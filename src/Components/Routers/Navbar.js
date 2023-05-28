// Import required modules
import React, { useState } from "react";
import "./navbar.css";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

import BSLogo from "../../Assets/Images/bs.png";

// import links from Navlinks Component
import Navlinks from "./Navlinks";

export const OffcanvasContext = React.createContext();

// Creating a functional component called NavigationBar
function NavigationBar() {
  const [offcanvasExpanded, setOffcanvasExpanded] = useState(false);

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
              <OffcanvasContext.Provider
                value={[offcanvasExpanded, setOffcanvasExpanded]}
              >
                <Navlinks />
              </OffcanvasContext.Provider>
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
            <OffcanvasContext.Provider
              value={[offcanvasExpanded, setOffcanvasExpanded]}
            >
              <Navlinks />
            </OffcanvasContext.Provider>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default NavigationBar;
