import React, {useState, useEffect} from "react";
import { Chart } from "react-google-charts";
import * as d3 from 'd3';



export const options = {
  chart: {
    title: "Box Office Earnings in First Two Weeks of Opening",
    subtitle: "in millions of dollars (USD)",
  },
};

export function TimeSeries() {
    const [parsedCsvData, setParsedCsvData] = useState([]);
    const [country, setCountry] = useState('United States')
    const [start, setStart] = useState(parseInt('1990'));
    const [end, setEnd] = useState(parseInt('2020'));
    const columns = ['Year', 'GDP']

    const fetchCsv = () => {
        const response = d3.csv('gdp_all.csv').then(response => {  
            var filteredData = response.filter(function(d) 
        { 

            if( d["Country Name"] === country)
            { 
                
                let dataSource = [];
                dataSource.push(columns);
                let i=0;
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
        fetchCsv();
        return () => {

        }
    }, [])
    

  return (
      <>


    <Chart
        chartType="Line"
        width="100%"
        height="400px"
        data={parsedCsvData}
        // options={options}
        />

      </>

  );
}