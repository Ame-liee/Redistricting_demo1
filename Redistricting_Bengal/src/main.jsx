import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home.jsx";
import Analysis from "./Analysis.jsx";
import About from "./About.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Analysis />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  </StrictMode>
);
