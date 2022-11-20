import React, {useState, useEffect} from "react";
import { Chart } from "react-google-charts";
import csvFile from '../../data/gdp_all.csv';
import * as d3 from 'd3';


export default function GDP(props) {
    const [parsedCsvData, setParsedCsvData] = useState([]);
    const columns = ['Year', 'GDP']

    const fetchCsv = (country, start, end) => {
        const response = d3.csv(csvFile).then(response => {  
            var filteredData = response.filter(function(d) 
            { 
                if( d["Country Name"] === country)
                { 
                    console.log(d);
                    let dataSource = [];
                    dataSource.push(columns);
                    for (const [key, value] of Object.entries(d)){
                        if (parseInt(key)>=start && parseInt(key)<=end){
                            let row = [];
                            row.push(key);
                            row.push(parseFloat(value))
                            dataSource.push(row);
                        }
                    };  
                    dataSource.slice(0, dataSource.length-5)
                    setParsedCsvData(dataSource)
                    return d;
                } 
            })
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        console.log(props)
        fetchCsv(props.country, props.start, props.end);
    }, [props]);

    
  return (
      <>
       
        <Chart
            chartType="Line"
            width="100%"
            height="400px"
            data={parsedCsvData}
            
        />
      </>

  );
}