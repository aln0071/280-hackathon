import React from "react";
import { Chart } from "react-google-charts";

export const options = {};

export default function Chart1({ data }) {
  return (
    <Chart
      chartType="Sankey"
      width="100%"
      height="500px"
      data={data}
      options={options}
    />
  );
}
