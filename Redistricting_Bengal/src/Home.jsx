import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import USAMap from "react-usa-map";
import bengalLogo from "./assets/Bengal.svg";
import { Nav, Navbar, Container, Button, Alert } from "react-bootstrap";

function Home() {
  const [stateName, setStateName] = useState("SELECT A STATE");
  const [showInfo1, setShowInfo1] = useState(false);
  const [showInfo2, setShowInfo2] = useState(false);
  const [stateColors, setStateColors] = useState({
    AL: "#EEE",
    MS: "#EEE",
    PA: "#EEE",
  });
  const state = {
    AL: "Alabama",
    AK: "Alaska",
    AZ: "Arizona",
    AR: "Arkansas",
    CA: "California",
    CO: "Colorado",
    CT: "Connecticut",
    DE: "Delaware",
    DC: "District of Columbia",
    FL: "Florida",
    GA: "Georgia",
    HI: "Hawaii",
    ID: "Idaho",
    IL: "Illinois",
    IN: "Indiana",
    IA: "Iowa",
    KS: "Kansas",
    KY: "Kentucky",
    LA: "Louisiana",
    ME: "Maine",
    MD: "Maryland",
    MA: "Massachusetts",
    MI: "Michigan",
    MN: "Minnesota",
    MS: "Mississippi",
    MO: "Missouri",
    MT: "Montana",
    NE: "Nebraska",
    NV: "Nevada",
    NH: "New Hampshire",
    NJ: "New Jersey",
    NM: "New Mexico",
    NY: "New York",
    NC: "North Carolina",
    ND: "North Dakota",
    OH: "Ohio",
    OK: "Oklahoma",
    OR: "Oregon",
    PA: "Pennsylvania",
    RI: "Rhode Island",
    SC: "South Carolina",
    SD: "South Dakota",
    TN: "Tennessee",
    TX: "Texas",
    UT: "Utah",
    VT: "Vermont",
    VA: "Virginia",
    WA: "Washington",
    WV: "West Virginia",
    WI: "Wisconsin",
    WY: "Wyoming",
  };
  const mapHandler = (event) => {
    setStateName(state[event.target.dataset.name].toUpperCase());
    window.scrollTo(0, 900);
  };
  const statesCustomConfig = () => {
    return {
      AL: {
        clickHandler: mapHandler,
        fill: stateColors.AL,
      },
      MS: {
        clickHandler: mapHandler,
        fill: stateColors.MS,
      },
      PA: {
        clickHandler: mapHandler,
        fill: stateColors.PA,
      },
    };
  };
  return (
    <>
      <div className="body">
        <Navbar data-bs-theme="dark" className="brand">
          <Navbar.Brand href="#home" className="text_FAIRWIN">
            <img
              alt=""
              src={bengalLogo}
              width="40"
              height="40"
              className="bengal"
            />
            &nbsp; FAIRWIN
          </Navbar.Brand>
        </Navbar>
        <Container className="content">
          <div className="text_question">IS A FAIR VOTE BEING HELD?</div>
          <div className="text_stateName">{stateName}</div>
          <Container className="map">
            <USAMap
              title="USA Map"
              defaultFill="rgb(135, 135, 135)"
              onClick={mapHandler}
              customize={statesCustomConfig()}
            />
          </Container>
          <div className="dataExplaination">
            <svg
              width="10px"
              height="10px"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>circle</title>
              <circle
                cx="512"
                cy="512"
                r="256"
                fill="rgb(255, 255, 255)"
                fillRule="evenodd"
              />
            </svg>
            &nbsp;<span className="text_Available_State">Available State</span>
          </div>
        </Container>
      </div>
      <div className="body1">
        <h2 className="text_subQuestion">
          WILL FAIR REPRESENTATION ACT(FRA) for MMD
        </h2>
        <span className="text_subQuestion2"> INCREASE FAIRNESS?</span>
        <Button
          variant="link"
          className="button_information"
          onClick={() => setShowInfo1(true)}
        >
          <svg
            fill="rgb(40, 38, 38)"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="30px"
            height="30px"
            viewBox="0 0 416.979 416.979"
            xml:space="preserve"
          >
            <g>
              <path
                d="M356.004,61.156c-81.37-81.47-213.377-81.551-294.848-0.182c-81.47,81.371-81.552,213.379-0.181,294.85
    c81.369,81.47,213.378,81.551,294.849,0.181C437.293,274.636,437.375,142.626,356.004,61.156z M237.6,340.786
    c0,3.217-2.607,5.822-5.822,5.822h-46.576c-3.215,0-5.822-2.605-5.822-5.822V167.885c0-3.217,2.607-5.822,5.822-5.822h46.576
    c3.215,0,5.822,2.604,5.822,5.822V340.786z M208.49,137.901c-18.618,0-33.766-15.146-33.766-33.765
    c0-18.617,15.147-33.766,33.766-33.766c18.619,0,33.766,15.148,33.766,33.766C242.256,122.755,227.107,137.901,208.49,137.901z"
              />
            </g>
          </svg>
        </Button>
        {showInfo1 && (
          <Alert
            variant="dark"
            className="alert_dataInformation"
            onClose={() => setShowInfo1(false)}
            dismissible
          >
            <Alert.Heading>ABOUT THE DATA</Alert.Heading>
            <p>In this section, ..</p>
          </Alert>
        )}
        <br />
        <br />
        <Nav
          fill
          variant="tabs"
          defaultActiveKey="/home"
          className="navbar_race"
        >
          <Nav.Item>
            <Nav.Link eventKey="link-1" className="text_navElement">
              African American
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2" className="text_navElement">
              Hispanic
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-3" className="text_navElement">
              Asian American
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <div className="graph1">temporary graph</div>
        <br />
        <h2 className="text_subQuestion">
          WILL FAIR REPRESENTATION ACT(FRA) for MMD
        </h2>
        <span className="text_subQuestion2">
          {" "}
          LESSEN THE GERRYMANDERING EFFECTS?
        </span>
        <Button
          variant="link"
          className="button_information"
          onClick={() => setShowInfo2(true)}
        >
          <svg
            fill="rgb(40, 38, 38)"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="30px"
            height="30px"
            viewBox="0 0 416.979 416.979"
            xml:space="preserve"
          >
            <g>
              <path
                d="M356.004,61.156c-81.37-81.47-213.377-81.551-294.848-0.182c-81.47,81.371-81.552,213.379-0.181,294.85
    c81.369,81.47,213.378,81.551,294.849,0.181C437.293,274.636,437.375,142.626,356.004,61.156z M237.6,340.786
    c0,3.217-2.607,5.822-5.822,5.822h-46.576c-3.215,0-5.822-2.605-5.822-5.822V167.885c0-3.217,2.607-5.822,5.822-5.822h46.576
    c3.215,0,5.822,2.604,5.822,5.822V340.786z M208.49,137.901c-18.618,0-33.766-15.146-33.766-33.765
    c0-18.617,15.147-33.766,33.766-33.766c18.619,0,33.766,15.148,33.766,33.766C242.256,122.755,227.107,137.901,208.49,137.901z"
              />
            </g>
          </svg>
        </Button>
        {showInfo2 && (
          <Alert
            variant="dark"
            className="alert_dataInformation"
            onClose={() => setShowInfo2(false)}
            dismissible
          >
            <Alert.Heading>ABOUT THE DATA</Alert.Heading>
            <p>In this section, ..</p>
          </Alert>
        )}
        <br />
        <br />
        <div className="graph1">temporary graph: Seat vs. Vote Symmetry</div>
      </div>
    </>
  );
}

export default Home;
