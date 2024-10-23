import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PoliticalBarChart = ({ data }) => {
  return (
    <ResponsiveContainer className="responsiveContainer">
      <BarChart
        data={data}
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
        <Bar dataKey="democrats" fill="blue" />
        <Bar dataKey="republicans" fill="red" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PoliticalBarChart;
