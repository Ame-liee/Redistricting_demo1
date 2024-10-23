import React from "react";
import usaMapData from "@svg-maps/usa";

const USMap = ({
  hoveredLocation,
  selectedState,
  setHoveredLocation,
  setSelectedState,
}) => {
  const customStates = ["Alabama", "Mississippi", "Pennsylvania"];

  return (
    <svg viewBox={usaMapData.viewBox} xmlns="http://www.w3.org/2000/svg">
      {usaMapData.locations.map((location) => {
        const isCustom = customStates.includes(location.name);
        return (
          <path
            key={location.id}
            d={location.path}
            fill={
              hoveredLocation === location.name
                ? "rgba(236, 31, 12, 0.7)"
                : selectedState === location.name
                ? "rgb(236, 31, 12)"
                : isCustom
                ? "#EEE"
                : "rgb(135, 135, 135)"
            }
            stroke="rgba(40, 38, 38, 1.0)"
            strokeWidth={selectedState === location.name ? 3.0 : 0.9}
            onMouseEnter={() => setHoveredLocation(location.name)}
            onMouseLeave={() => setHoveredLocation(null)}
            onClick={isCustom ? () => setSelectedState(location.name) : null}
            style={{ cursor: "pointer" }}
          />
        );
      })}
    </svg>
  );
};

export default USMap;
