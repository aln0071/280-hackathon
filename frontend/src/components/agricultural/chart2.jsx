import React from "react";
import ReactApexChart from "react-apexcharts";

const cropNameMap = {
    rice: 'Rice',
    corn: 'Corn',
    wheat: 'Wheat',
    mangos: 'Mango',
    walnuts: 'Walnut',
    bananas: 'Banana'
}

export default function Chart2({ data, crop, year }) {

    const transformedData = {}
    data.slice(1)
        .forEach(row => {
            transformedData[row[1]] = transformedData[row[1]] ? transformedData[row[1]] + row[2] : row[2];
        })

    return (data &&
        <>
            <h4 className="pie-chart-header">{`${cropNameMap[crop]} Imports Quantity (tonnes), ${year}`}</h4>
            <ReactApexChart
                type="pie"
                options={{
                    labels: Object.keys(transformedData)
                }}
                series={Object.values(transformedData)}
            />
        </>
    )
}