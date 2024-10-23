import React from "react";
import { MapContainer, GeoJSON } from "react-leaflet";

const DistrictMap = ({ mapKey, coordinate, data, onEachDistrict }) => {
  return (
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
          data={data}
          onEachFeature={(district, layer) => {
            onEachDistrict(district, layer, data.indexOf(district));
          }}
        />
      </MapContainer>
    </div>
  );
};

export default DistrictMap;
