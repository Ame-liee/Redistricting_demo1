import React, { useState } from "react";
import USAMap from "react-usa-map";
import bengalLogo from "./assets/Bengal.svg";
import { Navbar, Container } from "react-bootstrap";

function Home() {
  const [stateName, setStateName] = useState("SELECT A STATE");
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
  };
  const statesCustomConfig = () => {
    return {
      AL: {
        fill: "#EEE",
        clickHandler: (event) => console.log(event.target.dataset),
      },
      MS: {
        fill: "#EEE",
        clickHandler: (event) => console.log(event.target.dataset),
      },
      PA: {
        fill: "#EEE",
        clickHandler: (event) => console.log(event.target.dataset),
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
        <Container className="map">
          <USAMap
            title="USA Map"
            defaultFill="rgb(135, 135, 135)"
            onClick={mapHandler}
            customize={statesCustomConfig()}
          />
        </Container>
      </div>
    </>
  );
}

export default Home;
