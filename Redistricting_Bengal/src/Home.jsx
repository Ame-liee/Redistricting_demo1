import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Offcanvas,
  Nav,
  Navbar,
  Container,
  Button,
  Modal,
} from "react-bootstrap";
import bengalLogo from "./assets/Bengal.svg";
import arrowCircleIcon from "./assets/arrowCircleIcon.svg";
import circleIcon from "./assets/circleIcon.svg";
import sideBarIcon from "./assets/sideBarIcon.svg";
import Sidebar from "./Components/Sidebar";
import USMap from "./Components/USMap";

function Home() {
  const [selectedState, setSelectedState] = useState("SELECT A STATE");
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [showButtons, setShowButtons] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const customStates = ["Alabama", "Mississippi", "Pennsylvania"];
  const navigate = useNavigate();
  const toEnsemble = (state, option) => {
    navigate(`/Ensemble/${state}`, { state: { selectedState, option } });
  };
  const toRandom = (state, option) => {
    navigate(`/Random/${state}`, { state: { selectedState, option } });
  };
  return (
    <>
      <div className="body">
        <Sidebar show={showSideBar} handleClose={() => setShowSideBar(false)} />
        <div className="body_home">
          <Navbar data-bs-theme="dark" className="brand">
            <Navbar.Brand href="/" className="text_FAIRWIN">
              <img alt="" src={bengalLogo} className="svgIcon" />
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
              <USMap
                hoveredLocation={hoveredLocation}
                selectedState={selectedState}
                setHoveredLocation={setHoveredLocation}
                setSelectedState={setSelectedState}
              />
            </Container>
            {customStates.includes(selectedState) && (
              <div className="button_toAnalysis">
                <Button
                  variant="link"
                  // onClick={() => toAnalysis(selectedState)}
                  onClick={setShowButtons}
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
          <Modal
            show={showButtons}
            onHide={() => setShowButtons(false)}
            className="modal"
          >
            <div className="button-container">
              <Button
                variant="link"
                className="toAnalysisButtons"
                onClick={() => toEnsemble(selectedState, "Ensemble SMD/MMD")}
              >
                Ensemble SMD/MMD
              </Button>
              <Button
                variant="link"
                className="toAnalysisButtons"
                onClick={() => toRandom(selectedState, "Random SMD")}
              >
                Random SMD
              </Button>
              <Button
                variant="link"
                className="toAnalysisButtons"
                onClick={() => toRandom(selectedState, "Random MMD")}
              >
                Random MMD
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default Home;
