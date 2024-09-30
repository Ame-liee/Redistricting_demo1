import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import USAMap from "react-usa-map";
import bengalLogo from "./assets/Bengal.svg";
import { Nav, Navbar, Container } from "react-bootstrap";

function Home() {
  const [stateName, setStateName] = useState("SELECT A STATE");
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
          <div className="text_question">Is a fair vote being held?</div>
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
          Will Fair Representation Act(FRA) for MMD
        </h2>
        <span className="text_subQuestion2"> Increase Fairness?</span>
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
          Will Fair Representation Act(FRA) for MMD
        </h2>
        <span className="text_subQuestion2">
          {" "}
          Lessen the Gerrymandering Effects?
        </span>
        <br />
        <br />
        <div className="graph1">temporary graph: Seat vs. Vote Symmetry</div>
      </div>
    </>
  );
}

export default Home;
