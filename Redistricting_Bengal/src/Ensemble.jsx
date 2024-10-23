import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import StateInfoTable from "./Components/StateInfoTable";
import congDist from "./assets/blank_ensemble.json";
import copyGeo from "./assets/copyGeo.json";
import Sidebar from "./Components/Sidebar";
import Brand from "./Components/Brand";
import BoxWhisker from "./Components/BoxWhisker";
import { Nav, Container, Row, Col } from "react-bootstrap";
import SeatVoteCurve from "./Components/SeatVoteCurve";

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
  const [boxWhiskerSMD_data, setBoxWhiskerSMD] = useState(useBoxPlot([]));
  const [boxWhiskerMMD_data, setBoxWhiskerMMD] = useState(useBoxPlot([]));
  const [minority_curveSMD, setMinority_curveSMD] = useState();
  const [minority_curveMMD, setMinority_curveMMD] = useState();
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
  const formatYAxisTick = (tick) => {
    return `${(tick * 100).toFixed(0)}%`;
  };

  return (
    <>
      <div className="body">
        <Sidebar show={showSideBar} handleClose={() => setShowSideBar(false)} />
        <Brand />
        <div className="body_analysis">
          <Row className="contents_analysis">
            <Col xs={12} md={6} className="col_stateInformation">
              <Row className="item_contents_analysis">
                <div className="text_contentsTitle_Analysis">{option}</div>
              </Row>
              <Row className="item_contents_analysis">
                <StateInfoTable stateInfo={stateInfo} />
              </Row>
            </Col>
            <Col className="col_districtInformation">
              <Row className="item_contents_analysis">
                <Nav
                  variant="tabs"
                  defaultActiveKey="link-2"
                  className="navbar_analysis"
                >
                  <Nav.Item>
                    <Nav.Link
                      eventKey="link-2"
                      className="text_navElement_analysis"
                      onClick={() => setShowGraph("Box & Whisker")}
                    >
                      Box & Whisker
                    </Nav.Link>
                  </Nav.Item>
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
              {showGraph == "Curve" && (
                <Container>
                  <Row
                    className="item_contents_analysis"
                    style={{ width: "100%", height: 330 }}
                  >
                    <SeatVoteCurve
                      data={minority_curveSMD}
                      formatYAxisTick={formatYAxisTick}
                    />
                  </Row>
                  <Row
                    className="item_contents_analysis"
                    style={{ width: "100%", height: 330 }}
                  >
                    <SeatVoteCurve
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
                      formatYAxisTick={formatYAxisTick}
                    />
                  </Row>
                </Container>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default Ensemble;
