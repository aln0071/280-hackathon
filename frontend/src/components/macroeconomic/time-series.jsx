import React, {useState, useEffect} from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'
import { Chart } from "react-google-charts";
import * as d3 from 'd3';


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
    }, [country]);

    const handleSelect=(e)=>{
        console.log(e);
        setCountry(e)
      }
    

    

  return (
      <>
      
        <DropdownButton  
            alignRight
            title="Country"
            id="dropdown-menu-align-right"
            onSelect={handleSelect}>
                <Dropdown.Item eventKey = 'United States'>United States</Dropdown.Item>
                <Dropdown.Item eventKey = 'China'>China</Dropdown.Item>
                <Dropdown.Item eventKey = 'India'>India</Dropdown.Item>
                <Dropdown.Item eventKey = 'Ecuador'>Ecuador</Dropdown.Item>
        </DropdownButton>
        <Chart
            chartType="Line"
            width="100%"
            height="400px"
            data={parsedCsvData}
        />
      </>

  );
}