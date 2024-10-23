import React from "react";
import { Offcanvas, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import sideBarIcon from "../assets/sideBarIcon.svg";

const Sidebar = ({ show, handleClose }) => {
  return (
    <Navbar
      expand={false}
      sticky="top"
      data-bs-theme="dark"
      className="sidebar"
    >
      <Navbar.Toggle className="sidebar_button" aria-controls="offcanvasNavbar">
        <img alt="" src={sideBarIcon} className="svgIcon" />
      </Navbar.Toggle>
      <Navbar.Offcanvas
        aria-labelledby="offcanvasNavbarLabel"
        className="sidebar_offcanvas"
        placement="end"
      >
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body className="sidebar_body">
          <h1 id="textring">
            <span className="char1">F</span>
            <span className="char2">A</span>
            <span className="char3">I</span>
            <span className="char4">R</span>
            <span className="char5">V</span>
            <span className="char6">O</span>
            <span className="char7">T</span>
            <span className="char8">E</span>
            <span className="char9">*</span>
            <span className="char10">B</span>
            <span className="char11">E</span>
            <span className="char12">N</span>
            <span className="char13">G</span>
            <span className="char14">A</span>
            <span className="char15">L</span>
            <span className="char16">*</span>
          </h1>
          <Nav className="sidebar_nav">
            <Nav.Link as={Link} to="/">
              STATE SELECTION
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              ABOUT
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Navbar>
  );
};

export default Sidebar;
