import React, { useState, useRef, useMemo } from "react";
import bengalLogo from "./assets/Bengal.svg";
import usaMapData from "@svg-maps/usa";
import congDist from "./assets/ms_cvap_2020_cd.json";
import { MapContainer, GeoJSON } from "react-leaflet";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ZAxis,
  Scatter,
  ComposedChart,
  LineChart,
  Line,
} from "recharts";

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
const boxPlots1 = [
  {
    min: 0,
    lowerQuartile: 0.3,
    median: 0.2,
    upperQuartile: 0.8,
    max: 1,
    average: 0.6,
  },
  {
    min: 0,
    lowerQuartile: 0.3,
    median: 0.1,
    upperQuartile: 0.8,
    max: 1,
    average: 0.5,
  },
  {
    min: 0,
    lowerQuartile: 0.3,
    median: 0.8,
    upperQuartile: 0.8,
    max: 1,
    average: 0.4,
  },
  {
    min: 0,
    lowerQuartile: 0.2,
    median: 0.3,
    upperQuartile: 0.84,
    max: 1,
    average: 0.3,
  },
];
const boxPlots2 = [
  {
    min: 0,
    lowerQuartile: 0.3,
    median: 0.2,
    upperQuartile: 0.8,
    max: 1,
    average: 0.6,
  },
];

// Horizontal Line
const HorizonBar = (props) => {
  const { x, y, width, height } = props;

  if (x == null || y == null || width == null || height == null) {
    return null;
  }

  return (
    <line x1={x} y1={y} x2={x + width} y2={y} stroke={"#000"} strokeWidth={3} />
  );
};

// Whisker
const DotBar = (props) => {
  const { x, y, width, height } = props;

  if (x == null || y == null || width == null || height == null) {
    return null;
  }

  return (
    <line
      x1={x + width / 2}
      y1={y + height}
      x2={x + width / 2}
      y2={y}
      stroke={"#000"}
      strokeWidth={5}
      strokeDasharray={"5"}
    />
  );
};

// BoxPlot
const useBoxPlot = (boxPlots) => {
  const data = useMemo(
    () =>
      boxPlots.map((v) => {
        return {
          min: v.min,
          bottomWhisker: v.lowerQuartile - v.min,
          bottomBox: v.median - v.lowerQuartile,
          topBox: v.upperQuartile - v.median,
          topWhisker: v.max - v.upperQuartile,
          average: v.average,
          size: 250,
        };
      }),
    [boxPlots]
  );

  return data;
};
const data_curve = [
  {
    Republicans: 0,
    Democrats: 0,
  },
  {
    Republicans: 1,
    Democrats: 1,
  },
];
function Home() {
  const [selectedState, setSelectedState] = useState("SELECT A STATE");
  const [selectedDistrictPop_SMD, setselectedDistrictPop_SMD] = useState([
    congDist.features[0]["properties"]["vap"],
    congDist.features[0]["properties"]["vap_white"],
    congDist.features[0]["properties"]["vap_asian"],
    congDist.features[0]["properties"]["vap_black"],
    congDist.features[0]["properties"]["vap_hisp"],
    0,
    0,
  ]); // [population, White, Asian, Black, Hispanic, Democratic, Republican]
  const [selectedDistrictPop_MMD, setselectedDistrictPop_MMD] = useState([
    congDist.features[0]["properties"]["vap"],
    congDist.features[0]["properties"]["vap_white"],
    congDist.features[0]["properties"]["vap_asian"],
    congDist.features[0]["properties"]["vap_black"],
    congDist.features[0]["properties"]["vap_hisp"],
    0,
    0,
  ]);
  const [selectedDistrictSMD, setSelectedDistrictSMD] = useState(null);
  const [selectedDistrictMMD, setSelectedDistrictMMD] = useState(null);
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const customStates = ["Alabama", "Mississippi", "Pennsylvania"];
  const [showInfo1, setShowInfo1] = useState(false);
  const [showInfo2, setShowInfo2] = useState(false);
  const [showFairness, setShowFairness] = useState([true, false]); // Minority, Political Party
  const [coordinate, setCoordinate] = useState([32.3547, -90.0]);
  const data_boxPlot = [useBoxPlot(boxPlots1), useBoxPlot(boxPlots2)];
  const formatXAxisTick = (tick) => {
    return `${(tick * 100).toFixed(0)}%`;
  };
  const formatYAxisTick = (tick) => {
    return `${(tick * 100).toFixed(0)}%`;
  };
  const stateSelectionRef = useRef(0);
  const analysis1Ref = useRef(0);
  const analysis2Ref = useRef(0);
  const summaryRef = useRef(0);
  const mapHandler = (value) => {
    setSelectedState(value);
    if (value == "Alabama") {
      setCoordinate([32.8067, -86.7911]);
    } else if (value == "Mississippi") {
      setCoordinate([32.3547, -90.0]);
    } else {
      setCoordinate([40.8781, -77.7996]);
    }
    scrollTo("analysis1");
  };
  const onEachDistrict_summary = (district, layer) => {
    layer.bindPopup(
      "Population: " +
        district.properties.vap +
        "White: " +
        district.properties.vap_white +
        "Asian:" +
        district.properties.vap_asian +
        "Black" +
        district.properties.vap_black +
        "Hispanic" +
        district.properties.vap_hisp
    );
    layer.setStyle({
      color: "rgb(236, 31, 12)",
      fillColor: "black",
      fillOpacity: 1,
    });
  };
  const onEachDistrict_SMD = (district, layer) => {
    const onMouseOver = (e) => {
      layer.setStyle({
        fillColor: "rgb(40, 38, 38)",
      });
    };

    const onMouseOut = (e) => {
      layer.setStyle({
        fillColor: "rgb(220, 25, 10)",
      });
    };

    const onClick = (e) => {
      setSelectedDistrictSMD(district.properties);
      setselectedDistrictPop_SMD([
        district.properties.vap,
        district.properties.vap_white,
        district.properties.vap_asian,
        district.properties.vap_black,
        district.properties.vap_hisp,
        0,
        0,
      ]);
      // layer.setStyle({
      //   weight: 3,
      //   fillColor: "blue",
      // });
    };

    layer.setStyle({
      color: "rgba(241, 243, 243, 1)",
      fillColor: "rgb(220, 25, 10)",
    });
    layer.on({
      mouseout: onMouseOut,
      mouseover: onMouseOver,
      click: onClick,
    });
  };
  const onEachDistrict_MMD = (district, layer) => {
    const onMouseOver = (e) => {
      layer.setStyle({
        weight: 4,
        fillColor: "rgb(40, 38, 38)",
      });
    };

    const onMouseOut = (e) => {
      layer.setStyle({
        weight: 3,
        fillColor: "rgb(220, 25, 10)",
      });
    };

    const onClick = (e) => {
      setSelectedDistrictMMD(district.properties);
      setselectedDistrictPop_MMD([
        district.properties.vap,
        district.properties.vap_white,
        district.properties.vap_asian,
        district.properties.vap_black,
        district.properties.vap_hisp,
        0,
        0,
      ]);
      // layer.setStyle({
      //   weight: 3,
      //   fillColor: "blue",
      // });
    };

    layer.setStyle({
      color: "rgba(241, 243, 243, 1)",
      fillColor: "rgb(220, 25, 10)",
    });
    layer.on({
      mouseout: onMouseOut,
      mouseover: onMouseOver,
      click: onClick,
    });
  };

  return (
    <>
      <div className="body" ref={stateSelectionRef}>
        <Navbar
          expand={false}
          // sticky="top"
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
          <Nav
            variant="tabs"
            defaultActiveKey="link-1"
            className="navbar_fairness"
          >
            <Nav.Item>
              <Nav.Link
                eventKey="link-1"
                className="text_navElement_fairness"
                onClick={() => setShowFairness([true, false])}
              >
                Minority Fairness
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="link-2"
                className="text_navElement_fairness"
                onClick={() => setShowFairness([false, true])}
              >
                Political Fairness
              </Nav.Link>
            </Nav.Item>
          </Nav>
          {showFairness[0] && (
            <div className="analysis1" ref={analysis1Ref}>
              <h2 className="text_subQuestion1_1">
                WILL FAIR REPRESENTATION ACT(FRA) for MMD
                <span className="text_subQuestion2">
                  {" "}
                  INCREASE MINORITY FAIRNESS?
                </span>
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
              <br />
              <br />
              <div className="tableContainer_analysis">
                <Table striped bordered hover className="table_analysis">
                  <thead>
                    <tr>
                      <th className="table_0"></th>
                      <th>SMD</th>
                      <th>MMD</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="table_0">District Map</td>
                      <td>
                        <Container>
                          <MapContainer
                            key={coordinate}
                            center={coordinate}
                            zoom={6.3}
                            zoomControl={false}
                            scrollWheelZoom={false}
                            className="map_district"
                          >
                            <GeoJSON
                              data={congDist.features}
                              onEachFeature={onEachDistrict_SMD}
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
                            className="map_district"
                          >
                            <GeoJSON
                              data={congDist.features}
                              onEachFeature={onEachDistrict_MMD}
                            ></GeoJSON>
                          </MapContainer>
                        </Container>
                      </td>
                    </tr>
                    <tr>
                      <td className="table_0">Bar Chart</td>
                      <td>
                        {" "}
                        <div style={{ width: "100%", height: 300 }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              width={500}
                              height={300}
                              data={[
                                {
                                  name: "White",
                                  White: selectedDistrictPop_SMD[1],
                                },
                                {
                                  name: "Non-White",
                                  Aisan: selectedDistrictPop_SMD[2],
                                  Black: selectedDistrictPop_SMD[3],
                                  Hispanic: selectedDistrictPop_SMD[4],
                                },
                              ]}
                              margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                              }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="Asian" stackId="a" fill="red" />
                              <Bar dataKey="Black" stackId="a" fill="orange" />
                              <Bar
                                dataKey="Hispanic"
                                stackId="a"
                                fill="green"
                              />
                              <Bar dataKey="White" stackId="a" fill="blue" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </td>
                      <td>
                        {" "}
                        <div style={{ width: "100%", height: 300 }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              width={500}
                              height={300}
                              data={[
                                {
                                  name: "White",
                                  White: selectedDistrictPop_MMD[1],
                                },
                                {
                                  name: "Non-White",
                                  Aisan: selectedDistrictPop_MMD[2],
                                  Black: selectedDistrictPop_MMD[3],
                                  Hispanic: selectedDistrictPop_MMD[4],
                                },
                              ]}
                              margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                              }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="Asian" stackId="a" fill="red" />
                              <Bar dataKey="Black" stackId="a" fill="orange" />
                              <Bar
                                dataKey="Hispanic"
                                stackId="a"
                                fill="green"
                              />
                              <Bar dataKey="White" stackId="a" fill="blue" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="table_0">Box & Whisker Analysis</td>
                      <td>
                        <ResponsiveContainer minHeight={300}>
                          <ComposedChart data={data_boxPlot[0]}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <Bar stackId={"a"} dataKey={"min"} fill={"none"} />
                            <Bar
                              stackId={"a"}
                              dataKey={"bar"}
                              shape={<HorizonBar />}
                            />
                            <Bar
                              stackId={"a"}
                              dataKey={"bottomWhisker"}
                              shape={<DotBar />}
                            />
                            <Bar
                              stackId={"a"}
                              dataKey={"bottomBox"}
                              fill={"#8884d8"}
                            />
                            <Bar
                              stackId={"a"}
                              dataKey={"bar"}
                              shape={<HorizonBar />}
                            />
                            <Bar
                              stackId={"a"}
                              dataKey={"topBox"}
                              fill={"#8884d8"}
                            />
                            <Bar
                              stackId={"a"}
                              dataKey={"topWhisker"}
                              shape={<DotBar />}
                            />
                            <Bar
                              stackId={"a"}
                              dataKey={"bar"}
                              shape={<HorizonBar />}
                            />
                            <ZAxis
                              type="number"
                              dataKey="size"
                              range={[0, 250]}
                            />

                            <Scatter
                              dataKey="average"
                              fill={"red"}
                              stroke={"#FFF"}
                            />
                            <XAxis />
                            <YAxis
                              domain={[0, 1]}
                              tickFormatter={formatYAxisTick}
                            />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </td>
                      <td>
                        <ResponsiveContainer minHeight={300}>
                          <ComposedChart data={data_boxPlot[1]}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <Bar stackId={"a"} dataKey={"min"} fill={"none"} />
                            <Bar
                              stackId={"a"}
                              dataKey={"bar"}
                              shape={<HorizonBar />}
                            />
                            <Bar
                              stackId={"a"}
                              dataKey={"bottomWhisker"}
                              shape={<DotBar />}
                            />
                            <Bar
                              stackId={"a"}
                              dataKey={"bottomBox"}
                              fill={"#8884d8"}
                            />
                            <Bar
                              stackId={"a"}
                              dataKey={"bar"}
                              shape={<HorizonBar />}
                            />
                            <Bar
                              stackId={"a"}
                              dataKey={"topBox"}
                              fill={"#8884d8"}
                            />
                            <Bar
                              stackId={"a"}
                              dataKey={"topWhisker"}
                              shape={<DotBar />}
                            />
                            <Bar
                              stackId={"a"}
                              dataKey={"bar"}
                              shape={<HorizonBar />}
                            />
                            <ZAxis
                              type="number"
                              dataKey="size"
                              range={[0, 250]}
                            />

                            <Scatter
                              dataKey="average"
                              fill={"red"}
                              stroke={"#FFF"}
                            />
                            <XAxis />
                            <YAxis
                              domain={[0, 1]}
                              tickFormatter={formatYAxisTick}
                            />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          )}
          {showFairness[1] && (
            <div className="analysis2" ref={analysis2Ref}>
              <h2 className="text_subQuestion1_1">
                WILL FAIR REPRESENTATION ACT(FRA) for MMD
                <span className="text_subQuestion2">
                  {" "}
                  INCREASE POLITICAL FAIRNESS?
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
              <div className="tableContainer_analysis">
                <Table striped bordered hover className="table_analysis">
                  <thead>
                    <tr>
                      <th className="table_0"></th>
                      <th>SMD</th>
                      <th>MMD</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="table_0">District Map</td>
                      <td>
                        <Container>
                          <MapContainer
                            key={coordinate}
                            center={coordinate}
                            zoom={6.3}
                            zoomControl={false}
                            scrollWheelZoom={false}
                            className="map_district"
                          >
                            <GeoJSON
                              data={congDist.features}
                              onEachFeature={onEachDistrict_SMD}
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
                            className="map_district"
                          >
                            <GeoJSON
                              data={congDist.features}
                              onEachFeature={onEachDistrict_MMD}
                            ></GeoJSON>
                          </MapContainer>
                        </Container>
                      </td>
                    </tr>
                    <tr>
                      <td className="table_0">Bar Chart</td>
                      <td>
                        {" "}
                        <div style={{ width: "100%", height: 300 }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              width={500}
                              height={300}
                              data={[
                                {
                                  name: "Democrats",
                                  // Democrats: selectedDistrictPop_MMD[5],
                                  Democrats: 90000,
                                },
                                {
                                  name: "Republicans",
                                  // Republicans: selectedDistrictPop_MMD[6],
                                  Republicans: 50000,
                                },
                              ]}
                              margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                              }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar
                                dataKey="Democrats"
                                stackId="a"
                                fill="blue"
                              />
                              <Bar
                                dataKey="Republicans"
                                stackId="a"
                                fill="red"
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </td>
                      <td>
                        {" "}
                        <div style={{ width: "100%", height: 300 }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              width={500}
                              height={300}
                              data={[
                                {
                                  name: "Democrats",
                                  // Democrats: selectedDistrictPop_MMD[5],
                                  Democrats: 50000,
                                },
                                {
                                  name: "Republicans",
                                  // Republicans: selectedDistrictPop_MMD[6],
                                  Republicans: 50000,
                                },
                              ]}
                              margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                              }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar
                                dataKey="Democrats"
                                stackId="a"
                                fill="blue"
                              />
                              <Bar
                                dataKey="Republicans"
                                stackId="a"
                                fill="red"
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="table_0">Seat vs. Vote Symmetry</td>
                      <td>
                        <div style={{ width: "100%", height: 300 }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                              data={data_curve}
                              margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                              }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis
                                domain={[0, 1]}
                                tickFormatter={formatXAxisTick}
                              />
                              <YAxis
                                domain={[0, 1]}
                                tickFormatter={formatYAxisTick}
                              />
                              <Tooltip />
                              <Legend />
                              <Line
                                type="monotone"
                                dataKey="Democrats"
                                stroke="#8884d8"
                                activeDot={{ r: 8 }}
                              />
                              <Line
                                type="monotone"
                                dataKey="Republicans"
                                stroke="#82ca9d"
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </td>
                      <td>
                        <div style={{ width: "100%", height: 300 }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                              data={data_curve}
                              margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                              }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis
                                domain={[0, 1]}
                                tickFormatter={formatXAxisTick}
                              />
                              <YAxis
                                domain={[0, 1]}
                                tickFormatter={formatYAxisTick}
                              />
                              <Tooltip />
                              <Legend />
                              <Line
                                type="monotone"
                                dataKey="Democrats"
                                stroke="#8884d8"
                                activeDot={{ r: 8 }}
                              />
                              <Line
                                type="monotone"
                                dataKey="Republicans"
                                stroke="#82ca9d"
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          )}
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
              className="map_district2"
            >
              <GeoJSON
                data={congDist.features}
                onEachFeature={onEachDistrict_summary}
              ></GeoJSON>
            </MapContainer>
            <div className="text_summaryContent">
              <p className="text_summaryState">{selectedState}</p>
              <br />
              <br />
              <br />
              <p>
                Number of House Members:{" "}
                {Object.keys(congDist["features"]).length}
              </p>
              <p>Majority Party: Democratic Party</p>
            </div>
          </div>
          <Table striped bordered hover variant="dark" className="table">
            <thead>
              <tr>
                <th className="table_0"></th>
                <th className="table_th">SMD</th>
                <th className="table_th">MMD</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="table_0">Fairness</td>
                <td className="table_th"></td>
                <td className="table_th"></td>
              </tr>
              <tr>
                <td className="table_0">Gerrymandering Effect</td>
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
