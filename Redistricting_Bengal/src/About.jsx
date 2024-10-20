import React from "react";
import bengalLogo from "./assets/Bengal.svg";
import sideBarIcon from "./assets/sideBarIcon.svg";
import {
  Offcanvas,
  Nav,
  Navbar,
  NavDropdown,
  Container,
  Button,
  Alert,
  Table,
} from "react-bootstrap";

function About() {
  return (
    <>
      <div className="body">
        <Navbar
          expand={false}
          sticky="top"
          data-bs-theme="dark"
          className="sidebar"
        >
          <Navbar.Toggle
            className="sidebar_button"
            aria-controls="offcanvasNavbar"
          >
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
                <Nav.Link href="/">STATE SELECTION</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Navbar>
        <Navbar data-bs-theme="dark" className="brand">
          <Navbar.Brand href="/" className="text_FAIRWIN">
            <img alt="" src={bengalLogo} className="svgIcon" />
            &nbsp; FAIRWIN
          </Navbar.Brand>
        </Navbar>
        <div className="text_aboutContent">
          <h1>ABOUT FAIRWIN project</h1>
          <p>
            1. Will the Fair Representation Act for multi-member election
            districts (MMD) increase fairness?{" "}
          </p>
          <p>
            2. Will the Fair Representation Act for multi-member election
            districts (MMD) lessen the effects of Gerrymandering?{" "}
          </p>
          <br />
          <h1>ABOUT Fair Representation Act</h1>
          <p>1. Multi-member districts</p>
          <p>2. Ranked choice voting</p>
          <br />
          <h1>ABOUT Data</h1>
          <p>2020 House of Representative Election</p>
          <p>Reference : </p>
          <br />
          <h1>ABOUT Bengal</h1>
          <p>Data: Hyunjun Cho, HyoJong Chung</p>
          <p>BackEnd: Sinae Hong, Hyunjun Cho</p>
          <p>FrontEnd: Yeonkyung Ha</p>
        </div>
      </div>
    </>
  );
}

export default About;
