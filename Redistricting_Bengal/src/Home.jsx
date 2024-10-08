import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import bengalLogo from "./assets/Bengal.svg";
import usaMapData from "@svg-maps/usa";
import congDist from "./assets/ms_cvap_2020_cd.json";
import copyGeo from "./assets/copyGeo.json";

import {
  Offcanvas,
  Nav,
  Navbar,
  NavDropdown,
  Container,
  Button,
  Alert,
  Table,
  Form,
} from "react-bootstrap";
// const boxPlots1 = [
//   {
//     name: "District 1",
//     min: 0.05,
//     lowerQuartile: 0.1,
//     median: 0.15,
//     upperQuartile: 0.2,
//     max: 0.25,
//     average: 0.18,
//   },
//   {
//     name: "District 2",
//     min: 0.12,
//     lowerQuartile: 0.16,
//     median: 0.22,
//     upperQuartile: 0.25,
//     max: 0.3,
//     average: 0.24,
//   },
//   {
//     name: "District 3",
//     min: 0.3,
//     lowerQuartile: 0.35,
//     median: 0.4,
//     upperQuartile: 0.45,
//     max: 0.5,
//     average: 0.42,
//   },
//   {
//     name: "District 4",
//     min: 0.38,
//     lowerQuartile: 0.42,
//     median: 0.5,
//     upperQuartile: 0.55,
//     max: 0.6,
//     average: 0.45,
//   },
// ];
// const boxPlots2 = [
//   {
//     name: "District 1",
//     min: 0.38,
//     lowerQuartile: 0.42,
//     median: 0.5,
//     upperQuartile: 0.55,
//     max: 0.6,
//     average: 0.45,
//   },
// ];

// const data_curve1 = [
//   {
//     Republicans: 0,
//     Democrats: 0,
//   },
//   {
//     Republicans: 0.5,
//     Democrats: 0.4,
//   },
//   {
//     Republicans: 0.5,
//     Democrats: 0.4,
//   },
//   {
//     Republicans: 1,
//     Democrats: 1,
//   },
// ];

// // Horizontal Line
// const HorizonBar = (props) => {
//   const { x, y, width, height } = props;

//   if (x == null || y == null || width == null || height == null) {
//     return null;
//   }

//   return (
//     <line x1={x} y1={y} x2={x + width} y2={y} stroke={"#000"} strokeWidth={3} />
//   );
// };

// // Whisker
// const DotBar = (props) => {
//   const { x, y, width, height } = props;

//   if (x == null || y == null || width == null || height == null) {
//     return null;
//   }

//   return (
//     <line
//       x1={x + width / 2}
//       y1={y + height}
//       x2={x + width / 2}
//       y2={y}
//       stroke={"#000"}
//       strokeWidth={5}
//       strokeDasharray={"5"}
//     />
//   );
// };

// // BoxPlot
// const useBoxPlot = (boxPlots) => {
//   const data = useMemo(
//     () =>
//       boxPlots.map((v) => {
//         return {
//           name: v.name,
//           min: v.min,
//           bottomWhisker: v.lowerQuartile - v.min,
//           bottomBox: v.median - v.lowerQuartile,
//           topBox: v.upperQuartile - v.median,
//           topWhisker: v.max - v.upperQuartile,
//           average: v.average,
//           size: 250,
//         };
//       }),
//     [boxPlots]
//   );

//   return data;
// };
function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  // const onPieEnter = (_, index) => {
  //   setActiveIndex(index);
  // };
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
    copyGeo.features[0]["properties"]["vap"],
    copyGeo.features[0]["properties"]["vap_white"],
    copyGeo.features[0]["properties"]["vap_asian"],
    copyGeo.features[0]["properties"]["vap_black"],
    copyGeo.features[0]["properties"]["vap_hisp"],
    0,
    0,
  ]);
  // const [onPieChart, setOnPieChart] = useState(false);
  // const renderActiveShape = (props) => {
  //   const RADIAN = Math.PI / 180;
  //   const {
  //     cx,
  //     cy,
  //     midAngle,
  //     innerRadius,
  //     outerRadius,
  //     startAngle,
  //     endAngle,
  //     fill,
  //     payload,
  //     percent,
  //     value,
  //   } = props;
  //   const sin = Math.sin(-RADIAN * midAngle);
  //   const cos = Math.cos(-RADIAN * midAngle);
  //   const sx = cx + (outerRadius + 10) * cos;
  //   const sy = cy + (outerRadius + 10) * sin;
  //   const mx = cx + (outerRadius + 30) * cos;
  //   const my = cy + (outerRadius + 30) * sin;
  //   const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  //   const ey = my;
  //   const textAnchor = cos >= 0 ? "start" : "end";

  //   return (
  //     <g>
  //       <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
  //         {payload.name}
  //       </text>
  //       <Sector
  //         cx={cx}
  //         cy={cy}
  //         innerRadius={innerRadius}
  //         outerRadius={outerRadius}
  //         startAngle={startAngle}
  //         endAngle={endAngle}
  //         fill={fill}
  //       />
  //       <Sector
  //         cx={cx}
  //         cy={cy}
  //         startAngle={startAngle}
  //         endAngle={endAngle}
  //         innerRadius={outerRadius + 6}
  //         outerRadius={outerRadius + 10}
  //         fill={fill}
  //       />
  //       <path
  //         d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
  //         stroke={fill}
  //         fill="none"
  //       />
  //       <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
  //       <text
  //         x={ex + (cos >= 0 ? 1 : -1) * 12}
  //         y={ey}
  //         textAnchor={textAnchor}
  //         fill="#333"
  //       >{`${(percent * 100).toFixed(2)}%`}</text>
  //       <text
  //         x={ex + (cos >= 0 ? 1 : -1) * 12}
  //         y={ey}
  //         dy={18}
  //         textAnchor={textAnchor}
  //         fill="#999"
  //       >
  //         {`(${value})`}
  //       </text>
  //     </g>
  //   );
  // };
  // const [selectedDistrictSMD, setSelectedDistrictSMD] = useState(null);
  // const [selectedDistrictMMD, setSelectedDistrictMMD] = useState(null);
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const customStates = ["Alabama", "Mississippi", "Pennsylvania"];
  // const [showBelowStateSelection, setShowBelowStateSelection] = useState(true);
  // const [showInfo1, setShowInfo1] = useState(false);
  // const [showInfo2, setShowInfo2] = useState(false);
  // const [showPoliticalFairness, setShowPoliticalFairness] = useState(false); // Minority, Political Party
  const [coordinate, setCoordinate] = useState([32.3547, -90.0]);
  // const data_boxPlot = [useBoxPlot(boxPlots1), useBoxPlot(boxPlots2)];
  // const formatXAxisTick = (tick) => {
  //   return `${(tick * 100).toFixed(0)}%`;
  // };
  // const formatYAxisTick = (tick) => {
  //   return `${(tick * 100).toFixed(0)}%`;
  // };
  // const stateSelectionRef = useRef(0);
  // const minorityFairnessRef = useRef(0);
  // const politicalFairnessRef = useRef(0);
  // const analysisRef = useRef(0);
  const mapHandler = (value) => {
    setSelectedState(value);
    if (value == "Alabama") {
      setCoordinate([32.8067, -86.7911]);
    } else if (value == "Mississippi") {
      setCoordinate([32.3547, -90.0]);
    } else {
      setCoordinate([40.8781, -77.7996]);
    }
    // analysisRef.current.scrollIntoView();
  };

  // const onEachDistrict_SMD = (district, layer, index) => {
  //   const onMouseOver = (e) => {
  //     layer.setStyle({
  //       fillColor: "rgb(40, 38, 38)",
  //     });
  //   };

  //   const onMouseOut = (e) => {
  //     layer.setStyle({
  //       fillColor: "rgb(220, 25, 10)",
  //     });
  //   };

  //   const onClick = (e) => {
  //     setSelectedDistrictSMD(district.properties);
  //     setselectedDistrictPop_SMD([
  //       district.properties.vap,
  //       district.properties.vap_white,
  //       district.properties.vap_asian,
  //       district.properties.vap_black,
  //       district.properties.vap_hisp,
  //       0,
  //       0,
  //     ]);
  //     // layer.setStyle({
  //     //   weight: 3,
  //     //   fillColor: "blue",
  //     // });
  //   };
  //   const onAdd = (e) => {
  //     const label = L.divIcon({
  //       className: "district-label",
  //       html: `<div style="font-size: 20px; color: black;">${index + 1}</div>`,
  //     });
  //     L.marker(layer.getBounds().getCenter(), { icon: label }).addTo(
  //       layer._map
  //     );
  //   };
  //   layer.setStyle({
  //     color: "rgba(241, 243, 243, 1)",
  //     fillColor: "rgb(220, 25, 10)",
  //   });
  //   layer.on({
  //     mouseout: onMouseOut,
  //     mouseover: onMouseOver,
  //     click: onClick,
  //     add: onAdd,
  //   });
  // };
  // const onEachDistrict_MMD = (district, layer, index) => {
  //   const onMouseOver = (e) => {
  //     layer.setStyle({
  //       weight: 4,
  //       fillColor: "rgb(40, 38, 38)",
  //     });
  //   };

  //   const onMouseOut = (e) => {
  //     layer.setStyle({
  //       weight: 3,
  //       fillColor: "rgb(220, 25, 10)",
  //     });
  //   };

  //   const onClick = (e) => {
  //     setSelectedDistrictMMD(district.properties);
  //     setselectedDistrictPop_MMD([
  //       district.properties.vap,
  //       district.properties.vap_white,
  //       district.properties.vap_asian,
  //       district.properties.vap_black,
  //       district.properties.vap_hisp,
  //       0,
  //       0,
  //     ]);
  //   };
  //   const onAdd = (e) => {
  //     const label = L.divIcon({
  //       className: "district-label",
  //       html: `<div style="font-size: 20px; color: black;">${index + 1}</div>`,
  //     });
  //     L.marker(layer.getBounds().getCenter(), { icon: label }).addTo(
  //       layer._map
  //     );
  //   };
  //   layer.setStyle({
  //     color: "rgba(241, 243, 243, 1)",
  //     fillColor: "rgb(220, 25, 10)",
  //   });
  //   layer.on({
  //     mouseout: onMouseOut,
  //     mouseover: onMouseOver,
  //     click: onClick,
  //     add: onAdd,
  //   });
  // };
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
                {/* <Nav.Link
                  onClick={() => stateSelectionRef.current.scrollIntoView()}
                >
                  STATE SELECTION
                </Nav.Link> */}
                {/* <NavDropdown title="ANALYSIS" className="sidebar_dropdown">
                  <NavDropdown.Item
                    className="sidebar_dropdownItem"
                    onClick={() => {
                      analysisRef.current.scrollIntoView();
                      minorityFairnessRef.current?.click();
                    }}
                  >
                    Minority Fairness
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className="sidebar_dropdownItem"
                    onClick={() => {
                      analysisRef.current.scrollIntoView();
                      politicalFairnessRef.current?.click();
                    }}
                  >
                    Political Fairness
                  </NavDropdown.Item>
                </NavDropdown> */}
                <Nav.Link href="./about">ABOUT</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Navbar>
        <div className="body1">
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
                      onClick={
                        isCustom
                          ? () => {
                              mapHandler(location.name);
                              // setShowBelowStateSelection(true);
                            }
                          : null
                      }
                      style={{ cursor: "pointer" }}
                    />
                  );
                })}
              </svg>
            </Container>
            <div className="button_toAnalysis">
              <Button variant="link" onClick={() => toAnalysis(selectedState)}>
                <svg
                  width="50px"
                  height="50px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                    stroke="rgb(255, 255, 255)"
                    strokeWidth="2"
                  />
                  <path
                    d="M8 12H16M16 12L12 16M16 12L12 8"
                    stroke="rgb(255, 255, 255)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </div>
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
      </div>
    </>
  );
}

export default Home;
