import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import bengalLogo from "./assets/Bengal.svg";
import congDist from "./assets/blank.json";
import copyGeo from "./assets/copyGeo.json";
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
} from "react-bootstrap";
const boxPlots1 = [
  {
    name: "District 1",
    min: 0.05,
    lowerQuartile: 0.1,
    median: 0.15,
    upperQuartile: 0.2,
    max: 0.25,
    average: 0.18,
  },
  {
    name: "District 2",
    min: 0.12,
    lowerQuartile: 0.16,
    median: 0.22,
    upperQuartile: 0.25,
    max: 0.3,
    average: 0.24,
  },
  {
    name: "District 3",
    min: 0.3,
    lowerQuartile: 0.35,
    median: 0.4,
    upperQuartile: 0.45,
    max: 0.5,
    average: 0.42,
  },
  {
    name: "District 4",
    min: 0.38,
    lowerQuartile: 0.42,
    median: 0.5,
    upperQuartile: 0.55,
    max: 0.6,
    average: 0.45,
  },
];
const boxPlots2 = [
  {
    name: "District 1",
    min: 0.38,
    lowerQuartile: 0.42,
    median: 0.5,
    upperQuartile: 0.55,
    max: 0.6,
    average: 0.45,
  },
];
const data_curve1 = [
  {
    Republicans: 0,
    Democrats: 0,
  },
  {
    Republicans: 0.5,
    Democrats: 0.4,
  },
  {
    Republicans: 0.5,
    Democrats: 0.4,
  },
  {
    Republicans: 1,
    Democrats: 1,
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
function Analysis() {
  const [geoJson, setGeoJson] = useState(congDist);
  const { id: selectedState } = useParams();
  const [jsonSMD, setJsonSMD] = useState(geoJson.features);
  const jsonMMD = copyGeo.features;
  // const [showInfo, setShowInfo] = useState(false);
  const [showGraph, setShowGraph] = useState("A");
  const [mapKey, setMapKey] = useState(0);
  const data_boxPlot = [useBoxPlot(boxPlots1), useBoxPlot(boxPlots2)];
  let data_barchart_SMD_minority = [];
  let data_barchart_MMD_minority = [];
  let data_barchart_MMD_party = [];
  let data_barchart_SMD_party = [];
  const [stateInfo, setStateInfo] = useState({
    population: 0,
    votePopulation: 0,
    totalSeats: 0,
    democrat: 0,
    republican: 0,
  }); //Population, Voting Population, Representative Seats, (Democrats, Republicans)
  const [onMMD, setOnMMD] = useState(false);

  useEffect(() => {
    let value = "";
    if (selectedState == "Mississippi") {
      value = "/ms/all/districts";
    } else if (selectedState == "Alabama") {
      value = "/al/all/districts";
    } else {
      value = "/pa/all/districts";
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080${value}`);
        setGeoJson(response.data[0]);
        setJsonSMD(response.data[0].features);
        // console.log(typeof(response.data[0].features[0]["properties"]["win_pty"]));
        setMapKey(mapKey + 1);
        setStateInfo({
          population: 0,
          votePopulation: 0,
          totalSeats: 0,
          democrat: 0,
          republican: 0,
        });
        for (let i of response.data[0].features) {
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
        }
        console.log("Connected!");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedState]);
  const coordinate = useMemo(() => {
    if (selectedState === "Alabama") {
      return [32.8067, -86.7911];
    } else if (selectedState === "Mississippi") {
      return [32.3547, -90.0];
    } else {
      return [40.8781, -77.7996];
    }
  }, [selectedState]);
  for (var i = 0; i < jsonSMD.length; i++) {
    data_barchart_SMD_minority.push({
      name: i + 1,
      White: jsonSMD[i]["properties"]["total_wht"],
      Aisan: jsonSMD[i]["properties"]["total_asn"],
      Black: jsonSMD[i]["properties"]["total_blk"],
      Hispanic: jsonSMD[i]["properties"]["total_hsp"],
    });
    data_barchart_SMD_party.push({
      name: i + 1,
      Democrats: jsonSMD[i]["properties"]["vote_dem"],
      Republicans: jsonSMD[i]["properties"]["vote_rep"],
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
                <Nav.Link href="/">STATE SELECTION</Nav.Link>
                <Nav.Link href="./about">ABOUT</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Navbar>
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
        <div className="body2">
          <Container>
            <Row>
              <Col className="col_stateInformation">
                <Row>
                  <h1 className="text_selectedState_Analysis">
                    {selectedState.toUpperCase()}
                  </h1>
                </Row>
                <Row>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <td className="table_0">Population</td>
                        <td>{stateInfo.population}</td>
                        <td className="table_0">Voting Population</td>
                        <td>{stateInfo.votePopulation}</td>
                      </tr>
                      <tr>
                        <td className="table_0">Representative Seats</td>
                        <td>{stateInfo.totalSeats}</td>
                        <td className="table_0">Representative Party</td>
                        <td>
                          Democrat: {stateInfo.democrat}; Republican:{" "}
                          {stateInfo.republican}
                        </td>
                      </tr>
                    </thead>
                  </Table>
                </Row>
                <Row>
                  <div className="districtMap">
                    {!onMMD && (
                      <div className="mapContainer">
                        <MapContainer
                          key={mapKey}
                          center={coordinate}
                          zoom={6.5}
                          zoomControl={false}
                          scrollWheelZoom={false}
                          className="map_district"
                        >
                          <GeoJSON
                            data={jsonSMD}
                            onEachFeature={(district, layer) => {
                              onEachDistrict_SMD(
                                district,
                                layer,
                                jsonSMD.indexOf(district)
                              );
                            }}
                          />
                        </MapContainer>
                      </div>
                    )}
                    {onMMD && (
                      <div className="mapContainer">
                        <MapContainer
                          key={coordinate}
                          center={coordinate}
                          zoom={6.5}
                          zoomControl={false}
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
                    <Form>
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        onChange={() => setOnMMD(!onMMD)}
                      />
                    </Form>
                  </div>
                </Row>
              </Col>
              <Col className="col_districtInformation">
                <Row>
                  <Nav
                    variant="tabs"
                    defaultActiveKey="link-1"
                    className="navbar_fairness"
                  >
                    <Nav.Item>
                      <Nav.Link
                        eventKey="link-1"
                        className="text_navElement_fairness"
                        onClick={() => setShowGraph("A")}
                      >
                        Racial Population
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="link-2"
                        className="text_navElement_fairness"
                        onClick={() => setShowGraph("B")}
                      >
                        Box & Whisker
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="link-3"
                        className="text_navElement_fairness"
                        onClick={() => setShowGraph("C")}
                      >
                        Political Party
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="link-4"
                        className="text_navElement_fairness"
                        onClick={() => setShowGraph("D")}
                      >
                        Curve
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Row>
                {showGraph == "A" && (
                  <div className="analysis1">
                    {/* {showInfo && (
                      <Alert
                        variant="dark"
                        className="alert_dataInformation"
                        onClose={() => setShowInfo(false)}
                        dismissible
                      >
                        <Alert.Heading>ABOUT THE DATA</Alert.Heading>
                        <p>In this section, ..</p>
                      </Alert>
                    )} */}
                    <div className="tableContainer_analysis">
                      <Row style={{ padding: 0 }}>
                        <div
                          className="graphContainer"
                          style={{ width: "100%", height: 300 }}
                        >
                          <ResponsiveContainer
                            className="responsiveContainer"
                            width="100%"
                            height="100%"
                          >
                            <BarChart
                              width={500}
                              height={300}
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
                              <Bar
                                dataKey="Hispanic"
                                stackId="a"
                                fill="#f7a1b8"
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </Row>
                      <Row>
                        <div style={{ width: "100%", height: 300 }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              width={500}
                              height={300}
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
                              <Bar
                                dataKey="Hispanic"
                                stackId="a"
                                fill="#f7a1b8"
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </Row>
                    </div>
                  </div>
                )}
                {showGraph == "B" && (
                  <div className="tableContainer_analysis">
                    <div>
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
                          {/* 
                                <Scatter
                                  dataKey="average"
                                  fill={"red"}
                                  stroke={"#FFF"}
                                /> */}
                          <XAxis dataKey="name" />
                          <YAxis
                            domain={[0, 1]}
                            tickFormatter={formatYAxisTick}
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
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
                          {/* <Scatter
                                  dataKey="average"
                                  fill={"red"}
                                  stroke={"#FFF"}
                                /> */}
                          <XAxis dataKey="name" />
                          <YAxis
                            domain={[0, 1]}
                            tickFormatter={formatYAxisTick}
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
                {showGraph == "C" && (
                  <div className="tableContainer_analysis">
                    {/* {showInfo2 && (
                  <Alert
                    variant="dark"
                    className="alert_dataInformation"
                    onClose={() => setShowInfo2(false)}
                    dismissible
                  >
                    <Alert.Heading>ABOUT THE DATA</Alert.Heading>
                    <p>In this section, ..</p>
                  </Alert>
                )} */}
                    <div style={{ width: "100%", height: 300 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          width={500}
                          height={300}
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
                    </div>
                    <div style={{ width: "100%", height: 300 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          width={500}
                          height={300}
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
                    </div>
                  </div>
                )}
                {showGraph == "D" && (
                  <div className="tableContainer_analysis">
                    <div style={{ width: "100%", height: 300 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={data_curve1}
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
                                (data_curve1.length - 1)
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
                            dataKey="Democrats"
                            stroke="blue"
                            activeDot={{ r: 8 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="Republicans"
                            stroke="red"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div style={{ width: "100%", height: 300 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={[
                            {
                              Republicans: 0,
                              Democrats: 0,
                            },
                            {
                              Republicans: 1,
                              Democrats: 1,
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
                            dataKey="Democrats"
                            stroke="blue"
                            activeDot={{ r: 8 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="Republicans"
                            stroke="red"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Analysis;
