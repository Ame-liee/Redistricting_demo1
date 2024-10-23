import React, { useState } from "react";
import bengalLogo from "./assets/Bengal.svg";
import sideBarIcon from "./assets/sideBarIcon.svg";
import Sidebar from "./Components/Sidebar";
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
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <>
      <div className="body">
        <Sidebar show={showSideBar} handleClose={() => setShowSideBar(false)} />
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
