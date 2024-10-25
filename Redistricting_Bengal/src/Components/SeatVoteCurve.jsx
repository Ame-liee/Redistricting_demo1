import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SeatVoteCurve = ({ data, formatYAxisTick }) => {
  return (
    <ResponsiveContainer className="responsiveContainer">
      <LineChart
        data={data}
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
            return `${((tick * 100) / (data.length - 1)).toFixed(0)}%`;
          }}
        />
        <YAxis domain={[0, 1]} tickFormatter={formatYAxisTick} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Democrats"
          stroke="blue"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="Republicans" stroke="red" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SeatVoteCurve;
