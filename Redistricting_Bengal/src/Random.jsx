import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import bengalLogo from "./assets/Bengal.svg";
import congDist from "./assets/blank_random.json";
import copyGeo from "./assets/copyGeo.json";
import Sidebar from "./Components/Sidebar";
import StateInfoTable from "./Components/StateInfoTable";
import { Nav, Navbar, Container, Row, Col, Carousel } from "react-bootstrap";
import DistrictMap from "./Components/DistrictMap";
import MinorityBarChart from "./Components/MinorityBarChart";
import PoliticalBarChart from "./Components/PoliticalBarChart";

function Random() {
  const [showSideBar, setShowSideBar] = useState(false);
  const [geoFeature, setGeoFeature] = useState(congDist.features);
  const location = useLocation();
  const { selectedState, option } = location.state || {};
  const jsonMMD = copyGeo.features;
  const [showGraph, setShowGraph] = useState("Racial Population");
  const [mapKey, setMapKey] = useState(0);
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
      }
    };
    setGraphData(features);
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

  for (var i = 0; i < geoFeature.length; i++) {
    data_barchart_SMD_minority.push({
      name: i + 1,
      White: geoFeature[i]["properties"]["total_wht"],
      Asian: geoFeature[i]["properties"]["total_asn"],
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
      add: onAdd,
    });
  };

  return (
    <>
      <div className="body">
        <Sidebar show={showSideBar} handleClose={() => setShowSideBar(false)} />
        <Navbar data-bs-theme="dark" className="brand">
          <Navbar.Brand href="/" className="text_FAIRWIN">
            <img alt="" src={bengalLogo} className="svgIcon" />
            &nbsp; FAIRWIN
          </Navbar.Brand>
          <span className="text_selectedState_Analysis">
            {selectedState.toUpperCase()}
          </span>
        </Navbar>
        <div className="body_analysis">
          <Carousel
            variant="dark"
            activeIndex={index}
            onSelect={handleSelect}
            interval={null}
          >
            <Carousel.Item>
              <Row className="contents_analysis">
                <Col xs={12} md={6} className="col_stateInformation">
                  <Row className="item_contents_analysis">
                    <div className="text_contentsTitle_Analysis">{option}</div>
                  </Row>
                  <Row className="item_contents_analysis">
                    <StateInfoTable stateInfo={stateInfo} />
                  </Row>
                  <Row className="item_contents_analysis">
                    <div className="districtMap">
                      {!onMMD && (
                        <DistrictMap
                          mapKey={mapKey}
                          coordinate={coordinate}
                          data={geoFeature}
                          onEachDistrict={onEachDistrict_SMD}
                        />
                      )}
                      {onMMD && (
                        <DistrictMap
                          mapKey={mapKey}
                          coordinate={coordinate}
                          data={copyGeo.features}
                          onEachDistrict={onEachDistrict_MMD}
                        />
                      )}
                    </div>
                  </Row>
                </Col>
                <Col className="col_districtInformation">
                  <Row className="item_contents_analysis">
                    <Nav
                      variant="tabs"
                      defaultActiveKey="link-1"
                      className="navbar_analysis"
                    >
                      <Nav.Item>
                        <Nav.Link
                          eventKey="link-1"
                          className="text_navElement_analysis"
                          onClick={() => setShowGraph("Racial Population")}
                        >
                          Racial Population
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          eventKey="link-3"
                          className="text_navElement_analysis"
                          onClick={() => setShowGraph("Political Party")}
                        >
                          Political Party
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Row>
                  {showGraph == "Racial Population" && (
                    <div>
                      <Row
                        className="item_contents_analysis"
                        style={{ width: "100%", height: 330 }}
                      >
                        <MinorityBarChart data={data_barchart_SMD_minority} />
                      </Row>
                    </div>
                  )}
                  {showGraph == "Political Party" && (
                    <Container>
                      <Row
                        className="item_contents_analysis"
                        style={{ width: "100%", height: 330 }}
                      >
                        <PoliticalBarChart data={data_barchart_SMD_party} />
                      </Row>
                    </Container>
                  )}
                </Col>
              </Row>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </>
  );
}

export default Random;
