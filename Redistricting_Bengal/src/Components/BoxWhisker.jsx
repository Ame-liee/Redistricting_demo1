import React from "react";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ZAxis,
  ComposedChart,
} from "recharts";

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

function BoxWhisker({ data, formatYAxisTick }) {
  return (
    <ResponsiveContainer className="responsiveContainer">
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <Bar stackId={"a"} dataKey={"min"} fill={"none"} />
        <Bar stackId={"a"} dataKey={"bar"} shape={<HorizonBar />} />
        <Bar stackId={"a"} dataKey={"bottomWhisker"} shape={<DotBar />} />
        <Bar stackId={"a"} dataKey={"bottomBox"} fill={"#8884d8"} />
        <Bar stackId={"a"} dataKey={"bar"} shape={<HorizonBar />} />
        <Bar stackId={"a"} dataKey={"topBox"} fill={"#8884d8"} />
        <Bar stackId={"a"} dataKey={"topWhisker"} shape={<DotBar />} />
        <Bar stackId={"a"} dataKey={"bar"} shape={<HorizonBar />} />
        <ZAxis type="number" dataKey="size" range={[0, 250]} />
        {/* 
                                <Scatter
                                  dataKey="average"
                                  fill={"red"}
                                  stroke={"#FFF"}
                                /> */}
        <XAxis dataKey="name" />
        <YAxis domain={[0, 1]} tickFormatter={formatYAxisTick} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
export default BoxWhisker;
