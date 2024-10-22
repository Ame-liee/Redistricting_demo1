import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home.jsx";
import Ensemble from "./Ensemble.jsx";
import Random from "./Random.jsx";
import About from "./About.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Ensemble/:id" element={<Ensemble />} />
      <Route path="/Random/:id" element={<Random />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </Router>
);
