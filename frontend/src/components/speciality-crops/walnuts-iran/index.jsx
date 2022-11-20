import React from "react";
import Papa from 'papaparse'
import csvFile from '../../../data/walnuts-iran.csv';
import Chart from 'react-apexcharts'

const options = {
    chart: {
        type: 'spline'
    },
    title: {
        text: 'Iran - Area Harvested and Production'
    },
    yaxis: [
        {
            title: {
                text: 'Area harvested (ha)'
            }
        },
        {
            title: {
                text: 'Production (Tones)'
            },
            opposite: true
        }
    ],
    labels: Array.from({ length: (2020 - 1961 + 1) }, (v, k) => `01 Jan ${1961 + k}`),
    xaxis: {
        type: 'datetime',
        labels: {
            format: 'yyyy'
        }
    },
    tooltip: {
        x: {
            format: "yyyy"
        }
    }
}

export default function WalnutsIran() {

    const [series, setSeries] = React.useState([]);

    React.useEffect(() => {
        const getData = async () => {
            const response = await fetch(csvFile)
            const reader = response.body.getReader();
            const result = await reader.read();
            const decoder = new TextDecoder('utf-8');
            const csv = decoder.decode(result.value);
            const results = Papa.parse(csv, { header: true })
            const rows = results.data;
            console.log(rows)
            if (rows.length > 0) {
                const areaHarvested = [];
                const production = [];
                rows.forEach(row => {
                    areaHarvested.push(row['Area harvested (ha)'])
                    production.push(row['Production (tonnes)'])
                })
                setSeries([
                    {
                        name: "Area harvested (ha)",
                        data: areaHarvested
                    },
                    {
                        name: "Production (tones)",
                        data: production
                    }
                ])
            }
        }
        getData();
    }, [])

    return (
        <Chart options={options} series={series} type="line" />
    )
}