import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import bengalLogo from "./assets/Bengal.svg";
import testJson from "./assets/blank_random.json";
import Sidebar from "./Components/Sidebar";
import StateInfoTable from "./Components/StateInfoTable";
import { Nav, Navbar, Container, Row, Col, Carousel } from "react-bootstrap";
import DistrictMap from "./Components/DistrictMap";
import MinorityBarChart from "./Components/MinorityBarChart";
import PoliticalBarChart from "./Components/PoliticalBarChart";

function Random() {
  const [showSideBar, setShowSideBar] = useState(false);
  const [geoFeature, setGeoFeature] = useState([]);
  const location = useLocation();
  const { selectedState, option } = location.state || {};
  const [showGraph, setShowGraph] = useState("Racial Population");
  const [mapKey, setMapKey] = useState(0);
  const [data_barchart_minority, setData_barchart_minority] = useState([]);
  const [data_barchart_party, setData_barchart_party] = useState([]);
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const [stateInfo, setStateInfo] = useState({
    population: 0,
    votePopulation: 0,
    totalSeats: 0,
    Democrat: 0,
    Republican: 0,
  }); //Population, Voting Population, Representative Seats, (Democrats, Republicans)

  useEffect(() => {
    const setAPI = () => {
      let value = "";
      if (option == "Random SMD") {
        if (selectedState == "Mississippi") {
          value = "/MS/all/districts/smd";
        } else if (selectedState == "Alabama") {
          value = "/AL/all/districts/smd";
        } else {
          value = "/PA/all/districts/smd";
        }
      } else if (option == "Random MMD") {
        if (selectedState == "Mississippi") {
          value = "/MS/all/districts/mmd";
        } else if (selectedState == "Alabama") {
          value = "/AL/all/districts/mmd";
        } else {
          value = "/PA/all/districts/mmd";
        }
      }
      return value;
    };
    const initValue = () => {
      setStateInfo({
        population: 0,
        votePopulation: 0,
        totalSeats: 0,
        Democrat: 0,
        Republican: 0,
      });
      setData_barchart_minority([]);
      setData_barchart_party([]);
    };
    const setGraphData = (features) => {
      for (let i of features) {
        if (i["properties"]["win_pty"] == "DEMOCRATS") {
          setStateInfo((prevInfo) => ({
            population: prevInfo.population + i["properties"]["total_pop"],
            votePopulation:
              prevInfo.votePopulation + i["properties"]["vote_pop"],
            totalSeats: prevInfo.totalSeats + 1,
            Democrat: prevInfo.Democrat + 1,
            Republican: prevInfo.Republican,
          }));
        } else {
          setStateInfo((prevInfo) => ({
            population: prevInfo.population + i["properties"]["total_pop"],
            votePopulation:
              prevInfo.votePopulation + i["properties"]["vote_pop"],
            totalSeats: prevInfo.totalSeats + 1,
            Democrat: prevInfo.Democrat,
            Republican: prevInfo.Republican + 1,
          }));
        }
      }
    };
    const setBarchartData = (features) => {
      let barchart_minority = [];
      let barchart_party = [];
      for (var i = 0; i < features.length; i++) {
        let properties = features[i]["properties"];
        barchart_minority.push({
          name: i + 1,
          White: properties["total_wht"],
          Asian: properties["total_asn"],
          Black: properties["total_blk"],
          Hispanic: properties["total_hsp"],
        });
        barchart_party.push({
          name: i + 1,
          Democrats: properties["vote_dem"],
          Republicans: properties["vote_rep"],
        });
      }
      setData_barchart_minority(barchart_minority);
      setData_barchart_party(barchart_party);
      console.log(barchart_minority);
    };
    const fetchData = async () => {
      let features = [];
      try {
        const response = await axios.get(`http://localhost:8080${setAPI()}`);
        features = response.data[index].features;
        initValue();
        setGeoFeature(features);
        setGraphData(features);
        setBarchartData(features);
        setMapKey(mapKey + 1);
        console.log("Connected!");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedState, index]);
  const coordinate = useMemo(() => {
    if (selectedState === "Alabama") {
      return [32.8067, -86.7911];
    } else if (selectedState === "Mississippi") {
      return [32.3547, -90.0];
    } else {
      return [40.8781, -77.7996];
    }
  }, [selectedState]);

  const onEachDistrict = (district, layer, index) => {
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
            {[0, 1, 2, 3, 4].map((item, index) => (
              <Carousel.Item key={index}>
                <Row className="contents_analysis">
                  <Col xs={12} md={6} className="col_stateInformation">
                    <Row className="item_contents_analysis">
                      <div className="text_contentsTitle_Analysis">
                        {option}
                      </div>
                    </Row>
                    <Row className="item_contents_analysis">
                      <StateInfoTable stateInfo={stateInfo} />
                    </Row>
                    <Row className="item_contents_analysis">
                      <div className="districtMap">
                        <DistrictMap
                          mapKey={mapKey}
                          coordinate={coordinate}
                          data={geoFeature}
                          onEachDistrict={onEachDistrict}
                        />
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
                    {showGraph === "Racial Population" && (
                      <div>
                        <Row
                          className="item_contents_analysis"
                          style={{ width: "100%", height: 330 }}
                        >
                          <MinorityBarChart data={data_barchart_minority} />
                        </Row>
                      </div>
                    )}
                    {showGraph === "Political Party" && (
                      <Container>
                        <Row
                          className="item_contents_analysis"
                          style={{ width: "100%", height: 330 }}
                        >
                          <PoliticalBarChart data={data_barchart_party} />
                        </Row>
                      </Container>
                    )}
                  </Col>
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
}

export default Random;
