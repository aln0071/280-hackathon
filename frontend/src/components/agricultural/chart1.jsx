import React from "react";
import { Chart } from "react-google-charts";

export const options = {};

const cropNameMap = {
  rice: 'Rice',
  corn: 'Corn',
  wheat: 'Wheat',
  mangos: 'Mango',
  walnuts: 'Walnut',
  bananas: 'Banana'
}

export default function Chart1({  data, crop, year  }) {
  return (data &&(
    <>
    <center><h4>{`${cropNameMap[crop]} Exports ${year}`}</h4></center>
    <Chart
      chartType="Sankey"
      width="100%"
      height="500px"
      data={data}
      options={options}
    />
        </>
)
  );
}
