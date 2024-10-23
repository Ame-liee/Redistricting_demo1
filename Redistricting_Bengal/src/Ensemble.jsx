import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import bengalLogo from "./assets/Bengal.svg";
import sideBarIcon from "./assets/sideBarIcon.svg";
import StateInfoTable from "./Components/StateInfoTable";
import congDist from "./assets/blank_ensemble.json";
import copyGeo from "./assets/copyGeo.json";
import Sidebar from "./Components/Sidebar";
import Brand from "./Components/Brand";
import BoxWhisker from "./Components/BoxWhisker";
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
  Container,
  Alert,
  Table,
  Form,
  Row,
  Col,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  // Carousel,
} from "react-bootstrap";

// BoxPlot
const useBoxPlot = (boxPlots) => {
  const data = useMemo(
    () =>
      boxPlots.map((v) => {
        return {
          name: v.name,
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
function Ensemble() {
  const [showSideBar, setShowSideBar] = useState(false);
  const [geoFeature, setGeoFeature] = useState(congDist.features);
  const location = useLocation();
  const { selectedState, option } = location.state || {};
  const jsonMMD = copyGeo.features;
  const [showGraph, setShowGraph] = useState("Box & Whisker");
  const [mapKey, setMapKey] = useState(0);
  const [boxWhiskerSMD_data, setBoxWhiskerSMD] = useState(useBoxPlot([]));
  const [boxWhiskerMMD_data, setBoxWhiskerMMD] = useState(useBoxPlot([]));
  const [minority_curveSMD, setMinority_curveSMD] = useState();
  const [minority_curveMMD, setMinority_curveMMD] = useState();
  let data_barchart_SMD_minority = [];
  let data_barchart_MMD_minority = [];
  let data_barchart_MMD_party = [];
  let data_barchart_SMD_party = [];
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const [stateInfo, setStateInfo] = useState({
    population: 0,
    votePopulation: 0,
    totalSeats: 0,
    democrat: 0,
    republican: 0,
  }); //Population, Voting Population, Representative Seats, (Democrats, Republicans)
  const [onMMD, setOnMMD] = useState(false);

  useEffect(() => {
    let features = congDist.features;
    let value = "";
    if (selectedState == "Mississippi") {
      value = "/MS/all/districts";
    } else if (selectedState == "Alabama") {
      value = "/AL/all/districts";
    } else {
      value = "/PA/all/districts";
    }
    setStateInfo({
      population: 0,
      votePopulation: 0,
      totalSeats: 0,
      democrat: 0,
      republican: 0,
    });
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get(`http://localhost:8080${value}`);
    //     features = response.data.features;
    //     setGeoFeature(features);
    //     console.log(features);
    //     setMapKey(mapKey + 1);
    //     console.log("Connected!");
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };
    // fetchData();
    const setGraphData = (features) => {
      for (let i of features) {
        if (i["properties"]["win_pty"] == "DEMOCRATS") {
          setStateInfo((prevInfo) => ({
            population: prevInfo.population + i["properties"]["total_pop"],
            votePopulation:
              prevInfo.votePopulation + i["properties"]["vote_pop"],
            totalSeats: prevInfo.totalSeats + 1,
            democrat: prevInfo.democrat + 1,
            republican: prevInfo.republican,
          }));
        } else {
          setStateInfo((prevInfo) => ({
            population: prevInfo.population + i["properties"]["total_pop"],
            votePopulation:
              prevInfo.votePopulation + i["properties"]["vote_pop"],
            totalSeats: prevInfo.totalSeats + 1,
            democrat: prevInfo.democrat,
            republican: prevInfo.republican + 1,
          }));
        }
        setBoxWhiskerSMD(i["properties"]["box_whisker"]);
        setMinority_curveSMD(i["properties"]["minority_curve"]);
      }
    };
    setGraphData(features);
  }, [selectedState]);
  const boxWhiskerSMD = useBoxPlot(boxWhiskerSMD_data);
  const coordinate = useMemo(() => {
    if (selectedState === "Alabama") {
      return [32.8067, -86.7911];
    } else if (selectedState === "Mississippi") {
      return [32.3547, -90.0];
    } else {
      return [40.8781, -77.7996];
    }
  }, [selectedState]);
  for (var i = 0; i < geoFeature.length; i++) {
    data_barchart_SMD_minority.push({
      name: i + 1,
      White: geoFeature[i]["properties"]["total_wht"],
      Aisan: geoFeature[i]["properties"]["total_asn"],
      Black: geoFeature[i]["properties"]["total_blk"],
      Hispanic: geoFeature[i]["properties"]["total_hsp"],
    });
    data_barchart_SMD_party.push({
      name: i + 1,
      Democrats: geoFeature[i]["properties"]["vote_dem"],
      Republicans: geoFeature[i]["properties"]["vote_rep"],
    });
  }
  for (var i = 0; i < jsonMMD.length; i++) {
    data_barchart_MMD_minority.push({
      name: i + 1,
      White: jsonMMD[i]["properties"]["vap_white"],
      Aisan: jsonMMD[i]["properties"]["vap_asian"],
      Black: jsonMMD[i]["properties"]["vap_black"],
      Hispanic: jsonMMD[i]["properties"]["vap_hisp"],
    });
    data_barchart_MMD_party.push({
      name: i + 1,
      Democrats: 50000,
      Republicans: 50000,
    });
  }
  const formatXAxisTick = (tick) => {
    return `${(tick * 100).toFixed(0)}%`;
  };
  const formatYAxisTick = (tick) => {
    return `${(tick * 100).toFixed(0)}%`;
  };
  const onEachDistrict_SMD = (district, layer, index) => {
    let centroid = district["properties"]["centroid"].split(",");
    const latLng = L.latLng(parseFloat(centroid[1]), parseFloat(centroid[0]));
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
    layer.bindPopup(
      district["properties"]["win_pty"] +
        " (" +
        district["properties"]["win_cand"] +
        ")"
    );
    const onAdd = (e) => {
      const label = L.divIcon({
        className: "district-label",
        html: `<div style="font-size: 20px; color: black;">${index + 1}</div>`,
      });
      L.marker(latLng, { icon: label }).addTo(layer._map);
    };
    layer.setStyle({
      color: "rgba(241, 243, 243, 1)",
      fillColor: "rgb(220, 25, 10)",
    });
    layer.on({
      mouseout: onMouseOut,
      mouseover: onMouseOver,
      // click: onClick,
      add: onAdd,
    });
  };
  const onEachDistrict_MMD = (district, layer, index) => {
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
    // const onClick = (e) => {
    //   setjsonMMD(district.properties);
    // };
    const onAdd = (e) => {
      const label = L.divIcon({
        className: "district-label",
        html: `<div style="font-size: 20px; color: black;">${index + 1}</div>`,
      });
      L.marker(layer.getBounds().getCenter(), { icon: label }).addTo(
        layer._map
      );
    };
    layer.setStyle({
      color: "rgba(241, 243, 243, 1)",
      fillColor: "rgb(220, 25, 10)",
    });
    layer.on({
      mouseout: onMouseOut,
      mouseover: onMouseOver,
      // click: onClick,
      add: onAdd,
    });
  };

  return (
    <>
      <div className="body">
        <Sidebar show={showSideBar} handleClose={() => setShowSideBar(false)} />
        <Brand />
        <div className="body_analysis">
          {/* <Carousel
            variant="dark"
            activeIndex={index}
            onSelect={handleSelect}
            interval={null}
          >
            <Carousel.Item> */}
          <Row className="contents_analysis">
            <Col xs={12} md={6} className="col_stateInformation">
              <Row className="item_contents_analysis">
                <div className="text_contentsTitle_Analysis">{option}</div>
              </Row>
              <Row className="item_contents_analysis">
                <StateInfoTable stateInfo={stateInfo} />
              </Row>
              {/* <Row className="item_contents_analysis">
                <ToggleButtonGroup
                  className="switch_districtMap"
                  onChange={() => setOnMMD(!onMMD)}
                  type="radio"
                  name="options"
                  defaultValue={1}
                >
                  <ToggleButton
                    variant="outline-dark"
                    id="tbg-radio-1"
                    value={1}
                  >
                    SMD
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    id="tbg-radio-2"
                    value={2}
                  >
                    MMD
                  </ToggleButton>
                </ToggleButtonGroup>
                <div className="districtMap">
                  {!onMMD && (
                    <div>
                      <MapContainer
                        key={mapKey}
                        center={coordinate}
                        zoom={6.5}
                        zoomControl={true}
                        scrollWheelZoom={false}
                        className="map_district"
                      >
                        <GeoJSON
                          data={geoFeature}
                          onEachFeature={(district, layer) => {
                            onEachDistrict_SMD(
                              district,
                              layer,
                              geoFeature.indexOf(district)
                            );
                          }}
                        />
                      </MapContainer>
                    </div>
                  )}
                  {onMMD && (
                    <div>
                      <MapContainer
                        key={coordinate}
                        center={coordinate}
                        zoom={6.5}
                        zoomControl={true}
                        scrollWheelZoom={false}
                        className="map_district"
                      >
                        <GeoJSON
                          data={copyGeo.features}
                          onEachFeature={(district, layer) =>
                            onEachDistrict_MMD(
                              district,
                              layer,
                              copyGeo.features.indexOf(district)
                            )
                          }
                        />
                      </MapContainer>
                    </div>
                  )}
                </div>
              </Row> */}
            </Col>
            <Col className="col_districtInformation">
              <Row className="item_contents_analysis">
                <Nav
                  variant="tabs"
                  defaultActiveKey="link-1"
                  className="navbar_analysis"
                >
                  {/* <Nav.Item>
                    <Nav.Link
                      eventKey="link-1"
                      className="text_navElement_analysis"
                      onClick={() => setShowGraph("Racial Population")}
                    >
                      Racial Population
                    </Nav.Link>
                  </Nav.Item> */}
                  <Nav.Item>
                    <Nav.Link
                      eventKey="link-2"
                      className="text_navElement_analysis"
                      onClick={() => setShowGraph("Box & Whisker")}
                    >
                      Box & Whisker
                    </Nav.Link>
                  </Nav.Item>
                  {/* <Nav.Item>
                    <Nav.Link
                      eventKey="link-3"
                      className="text_navElement_analysis"
                      onClick={() => setShowGraph("Political Party")}
                    >
                      Political Party
                    </Nav.Link>
                  </Nav.Item> */}
                  <Nav.Item>
                    <Nav.Link
                      eventKey="link-4"
                      className="text_navElement_analysis"
                      onClick={() => setShowGraph("Curve")}
                    >
                      Curve
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Row>
              {/* {showGraph == "Racial Population" && (
                <div>
                  <Row
                    className="item_contents_analysis"
                    style={{ width: "100%", height: 330 }}
                  >
                    <ResponsiveContainer className="responsiveContainer">
                      <BarChart
                        data={data_barchart_SMD_minority}
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
                        <Bar dataKey="White" fill="#ffc658" />
                        <Bar dataKey="Asian" stackId="a" fill="#8884d8" />
                        <Bar dataKey="Black" stackId="a" fill="#82ca9d" />
                        <Bar dataKey="Hispanic" stackId="a" fill="#f7a1b8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Row>
                  <Row
                    className="item_contents_analysis"
                    style={{ width: "100%", height: 330 }}
                  >
                    <ResponsiveContainer className="responsiveContainer">
                      <BarChart
                        data={data_barchart_MMD_minority}
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
                        <Bar dataKey="White" fill="#ffc658" />
                        <Bar dataKey="Asian" stackId="a" fill="#8884d8" />
                        <Bar dataKey="Black" stackId="a" fill="#82ca9d" />
                        <Bar dataKey="Hispanic" stackId="a" fill="#f7a1b8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Row>
                </div>
              )} */}
              {showGraph == "Box & Whisker" && (
                <Container>
                  <Row
                    className="item_contents_analysis"
                    style={{ width: "100%", height: 330 }}
                  >
                    <BoxWhisker
                      data={boxWhiskerSMD}
                      formatYAxisTick={formatYAxisTick}
                    />
                  </Row>
                  <Row
                    className="item_contents_analysis"
                    style={{ width: "100%", height: 330 }}
                  >
                    <BoxWhisker
                      data={boxWhiskerMMD_data}
                      formatYAxisTick={formatYAxisTick}
                    />
                  </Row>
                </Container>
              )}
              {/* {showGraph == "Political Party" && (
                <Container>
                  <Row
                    className="item_contents_analysis"
                    style={{ width: "100%", height: 330 }}
                  >
                    <ResponsiveContainer className="responsiveContainer">
                      <BarChart
                        data={data_barchart_SMD_party}
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
                        <Bar dataKey="Democrats" fill="blue" />
                        <Bar dataKey="Republicans" fill="red" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Row>
                  <Row
                    className="item_contents_analysis"
                    style={{ width: "100%", height: 330 }}
                  >
                    <ResponsiveContainer className="responsiveContainer">
                      <BarChart
                        data={data_barchart_MMD_party}
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
                        <Bar dataKey="Democrats" fill="blue" />
                        <Bar dataKey="Republicans" fill="red" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Row>
                </Container>
              )} */}
              {showGraph == "Curve" && (
                <Container>
                  <Row
                    className="item_contents_analysis"
                    style={{ width: "100%", height: 330 }}
                  >
                    <ResponsiveContainer className="responsiveContainer">
                      <LineChart
                        data={minority_curveSMD}
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
                          tickFormatter={(tick) => {
                            return `${(
                              (tick * 100) /
                              (minority_curveSMD.length - 1)
                            ).toFixed(0)}%`;
                          }}
                        />
                        <YAxis
                          domain={[0, 1]}
                          tickFormatter={formatYAxisTick}
                        />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="democrats"
                          stroke="blue"
                          activeDot={{ r: 8 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="republicans"
                          stroke="red"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Row>
                  <Row
                    className="item_contents_analysis"
                    style={{ width: "100%", height: 330 }}
                  >
                    <ResponsiveContainer className="responsiveContainer">
                      <LineChart
                        data={[
                          {
                            republicans: 0,
                            democrats: 0,
                          },
                          {
                            republicans: 1,
                            democrats: 1,
                          },
                        ]}
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
                          dataKey="democrats"
                          stroke="blue"
                          activeDot={{ r: 8 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="republicans"
                          stroke="red"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Row>
                </Container>
              )}
            </Col>
          </Row>
          {/* </Carousel.Item> */}
          {/* </Carousel> */}
        </div>
      </div>
    </>
  );
}

export default Ensemble;
