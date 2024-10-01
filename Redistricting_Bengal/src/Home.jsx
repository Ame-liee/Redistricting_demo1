import React, { useState, useRef } from "react";
import bengalLogo from "./assets/Bengal.svg";
import boxGraph from "./assets/Box & Whisker Plot.png";
import partisanGraph from "./assets/seats-votes curve.png";
import usaMapData from "@svg-maps/usa";
import congDist from "./assets/ms_cvap_2020_cd.json";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
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

function Home() {
  const [selectedState, setSelectedState] = useState("SELECT A STATE");
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const customStates = ["al", "ms", "pa"];
  const [showInfo1, setShowInfo1] = useState(false);
  const [showInfo2, setShowInfo2] = useState(false);
  const [coordinate, setCoordinate] = useState([32.3547, -90.0]);
  const stateSelectionRef = useRef(0);
  const analysis1Ref = useRef(0);
  const analysis2Ref = useRef(0);
  const summaryRef = useRef(0);
  const mapHandler = (value) => {
    setSelectedState(value);
    scrollTo("analysis1");
  };
  const scrollTo = (value) => {
    if (value === "stateSelection" && stateSelectionRef.current) {
      stateSelectionRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (value === "analysis1" && analysis1Ref.current) {
      analysis1Ref.current.scrollIntoView({ behavior: "smooth" });
    } else if (value === "analysis2" && analysis2Ref.current) {
      analysis2Ref.current.scrollIntoView({ behavior: "smooth" });
    } else if (value === "summaryRef" && summaryRef.current) {
      summaryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const changeState = (value) => {
    setState(value);
    if (value == "Alabama") {
      setCoordinate([32.8067, -86.7911]);
    } else if (value == "Mississippi") {
      setCoordinate([32.3547, -90.0]);
    } else {
      setCoordinate([40.8781, -77.7996]);
    }
  };
  const onEachDistrict = (district, layer) => {
    const population = district.properties.C_TOT20;
    layer.bindPopup("Voting population: " + population);
    layer.on({
      mouseover: (e) => {
        layer.setStyle({
          weight: 4,
          color: "rgb(40, 38, 38)",
        });
      },
      mouseout: (e) => {
        layer.setStyle({
          weight: 3,
          color: "rgb(241, 243, 243)",
        });
      },
    });
    layer.setStyle({
      color: "rgb(241, 243, 243)",
      fillColor: "rgb(236, 31, 12)",
      fillOpacity: 0.2,
    });
  };
  const onEachDistrict2 = (district, layer) => {
    const population = district.properties.C_TOT20;
    layer.bindPopup("Voting population: " + population);
    layer.setStyle({
      color: "rgb(236, 31, 12)",
      fillColor: "black",
      fillOpacity: 1,
    });
  };

  return (
    <>
      <div className="body" ref={stateSelectionRef}>
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
            {" "}
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="40px"
              height="40px"
              viewBox="0 0 1280.000000 1280.000000"
              transform="rotate(180)"
              preserveAspectRatio="xMidYMid meet"
            >
              <metadata>
                Created by potrace 1.15, written by Peter Selinger 2001-2017
              </metadata>
              <g
                transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
                fill="rgb(40, 38, 38)"
                stroke="rgba(255, 255, 255, 1)"
                strokeWidth="400"
              >
                <path
                  d="M1000 10050 l0 -1510 4643 0 4642 0 755 755 755 755 -755 755 -755
755 -4642 0 -4643 0 0 -1510z"
                />
                <path
                  d="M1000 6390 l0 -1510 4648 0 4647 0 753 753 752 752 -758 758 -757
757 -4643 0 -4642 0 0 -1510z"
                />
                <path
                  d="M1000 2750 l0 -1510 4643 0 4642 0 753 753 c413 413 752 757 752 762
0 5 -336 346 -747 757 l-748 748 -4647 0 -4648 0 0 -1510z"
                />
              </g>
            </svg>
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
                <Nav.Link onClick={() => scrollTo("stateSelection")}>
                  STATE SELECTION
                </Nav.Link>
                <NavDropdown title="ANALYSIS" className="sidebar_dropdown">
                  <NavDropdown.Item
                    className="sidebar_dropdownItem"
                    onClick={() => scrollTo("analysis1")}
                  >
                    Fairness
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className="sidebar_dropdownItem"
                    onClick={() => scrollTo("analysis2")}
                  >
                    Gerrymandering Effect
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link onClick={() => scrollTo("summaryRef")}>
                  SUMMARY
                </Nav.Link>
                <Nav.Link href="./about">ABOUT</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Navbar>
        <div className="body1" ref={stateSelectionRef}>
          <Navbar data-bs-theme="dark" className="brand">
            <Navbar.Brand href="/" className="text_FAIRWIN">
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
                  const isCustom = customStates.includes(location.id);
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
                      onClick={() => mapHandler(location.name)}
                      style={{ cursor: "pointer" }}
                    />
                  );
                })}
              </svg>
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
              &nbsp;
              <span className="text_Available_State">Available State</span>
            </div>
          </Container>
        </div>
        <div className="body2">
          <div className="analysis1" ref={analysis1Ref}>
            <h2 className="text_subQuestion1_1">
              WILL FAIR REPRESENTATION ACT(FRA) for MMD
              <span className="text_subQuestion2"> INCREASE FAIRNESS?</span>
              <Button
                variant="link"
                className="button_information"
                onClick={() => setShowInfo1(true)}
              >
                <svg
                  fill="rgb(40, 38, 38)"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="30px"
                  height="30px"
                  viewBox="0 0 416.979 416.979"
                  xmlSpace="preserve"
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
            </h2>
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
          </div>
          <br />
          <br />
          <Nav
            fill
            variant="tabs"
            defaultActiveKey="link-1"
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
          <div className="graph">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>SMD</th>
                  <th>MMD</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img alt="" src={boxGraph} width="230" height="230" />
                  </td>
                  <td>
                    <img alt="" src={boxGraph} width="230" height="230" />
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <br />
          <div className="analysis2" ref={analysis2Ref}>
            <h2 className="text_subQuestion1_2">
              WILL FAIR REPRESENTATION ACT(FRA) for MMD
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
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="30px"
                  height="30px"
                  viewBox="0 0 416.979 416.979"
                  xmlSpace="preserve"
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
            </h2>
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
            <div className="graph">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>SMD</th>
                    <th>MMD</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <img
                        alt=""
                        src={partisanGraph}
                        width="230"
                        height="230"
                      />
                    </td>
                    <td>
                      <img
                        alt=""
                        src={partisanGraph}
                        width="230"
                        height="230"
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className="graph">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>SMD</th>
                    <th>MMD</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Container>
                        <MapContainer
                          key={coordinate}
                          center={coordinate}
                          zoom={6.3}
                          zoomControl={false}
                          scrollWheelZoom={false}
                          className="map_distrinct"
                        >
                          {/* <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              /> */}
                          <GeoJSON
                            data={congDist.features}
                            onEachFeature={onEachDistrict}
                          ></GeoJSON>
                        </MapContainer>
                      </Container>
                    </td>
                    <td>
                      <Container>
                        <MapContainer
                          key={coordinate}
                          center={coordinate}
                          zoom={6.3}
                          zoomControl={false}
                          scrollWheelZoom={false}
                          className="map_distrinct"
                        >
                          {/* <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              /> */}
                          <GeoJSON
                            data={congDist.features}
                            onEachFeature={onEachDistrict}
                          ></GeoJSON>
                        </MapContainer>
                      </Container>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>

        <div className="body3" ref={summaryRef}>
          <div className="text_summary">SUMMARY</div>
          <div className="summary_stateInformation">
            <MapContainer
              key={coordinate}
              center={coordinate}
              zoom={6.3}
              zoomControl={false}
              scrollWheelZoom={false}
              className="map_distrinct"
            >
              {/* <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              /> */}
              <GeoJSON
                data={congDist.features}
                onEachFeature={onEachDistrict2}
              ></GeoJSON>
            </MapContainer>
            <div className="text_summaryContent">
              <p className="text_summaryState">{selectedState}</p>
              <br />
              <br />
              <br />
              <p>Number of House Members: </p>
              <p>Majority Party: </p>
            </div>
          </div>
          <Table striped bordered hover variant="dark" className="table">
            <thead>
              <tr>
                <th className="table_th0"></th>
                <th className="table_th">SMD</th>
                <th className="table_th">MMD</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="table_th0">Fairness</td>
                <td className="table_th"></td>
                <td className="table_th"></td>
              </tr>
              <tr>
                <td className="table_th0">Gerrymandering Effect</td>
                <td className="table_th"></td>
                <td className="table_th"></td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default Home;
