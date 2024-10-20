import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Offcanvas, Nav, Navbar, Container, Button } from "react-bootstrap";
import bengalLogo from "./assets/Bengal.svg";
import arrowCircleIcon from "./assets/arrowCircleIcon.svg";
import circleIcon from "./assets/circleIcon.svg";
import sideBarIcon from "./assets/sideBarIcon.svg";
import usaMapData from "@svg-maps/usa";

function Home() {
  const [selectedState, setSelectedState] = useState("SELECT A STATE");
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const customStates = ["Alabama", "Mississippi", "Pennsylvania"];
  const navigate = useNavigate();
  const toAnalysis = (state) => {
    navigate(`/${state}`, { state: { selectedState } });
  };
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
            <img
                alt=""
                src={sideBarIcon}
                width="40px"
                height="40px"
                className="svgIcon"
              />
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
                <Nav.Link href="./about">ABOUT</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Navbar>
        <div className="body_home">
          <Navbar data-bs-theme="dark" className="brand">
            <Navbar.Brand href="/" className="text_FAIRWIN">
              <img
                alt=""
                src={bengalLogo}
                width="40"
                height="40"
                className="svgIcon"
              />
              &nbsp; FAIRWIN
            </Navbar.Brand>
          </Navbar>
          <Container>
            <div className="text_question">IS A FAIR VOTE BEING HELD?</div>
            <div className="text_selectedState">
              {hoveredLocation
                ? hoveredLocation.toUpperCase()
                : selectedState.toUpperCase()}
            </div>
            <Container className="map_us">
              <svg
                viewBox={usaMapData.viewBox}
                xmlns="http://www.w3.org/2000/svg"
              >
                {usaMapData.locations.map((location) => {
                  const isCustom = customStates.includes(location.name);
                  return (
                    <path
                      key={location.id}
                      d={location.path}
                      fill={
                        hoveredLocation === location.name
                          ? "rgba(236, 31, 12, 0.7)"
                          : selectedState == location.name
                          ? "rgb(236, 31, 12)"
                          : isCustom
                          ? "#EEE"
                          : "rgb(135, 135, 135)"
                      }
                      stroke="rgba(40, 38, 38, 1.0)"
                      strokeWidth={selectedState == location.name ? 3.0 : 0.9}
                      onMouseEnter={() => setHoveredLocation(location.name)}
                      onMouseLeave={() => setHoveredLocation(null)}
                      onClick={
                        isCustom
                          ? () => {
                              setSelectedState(location.name);
                            }
                          : null
                      }
                      style={{ cursor: "pointer" }}
                    />
                  );
                })}
              </svg>
            </Container>
            {customStates.includes(selectedState) && (
              <div className="button_toAnalysis">
                <Button
                  variant="link"
                  onClick={() => toAnalysis(selectedState)}
                >
                  <img
                    alt=""
                    src={arrowCircleIcon}
                    width="45px"
                    height="45px"
                    className="svgIcon"
                  />
                </Button>
              </div>
            )}
            <div className="dataExplaination">
              <span className="text_Available_State">
                {" "}
                <img
                  alt=""
                  src={circleIcon}
                  width="10px"
                  height="10px"
                  className="svgIcon"
                />
                &nbsp;Available State
              </span>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Home;
