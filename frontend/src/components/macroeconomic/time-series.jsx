import React, {useState, useEffect} from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'
import { Chart } from "react-google-charts";
import ReactBootstrapSlider from 'react-bootstrap-slider';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import * as d3 from 'd3';


export function TimeSeries() {
    const [parsedCsvData, setParsedCsvData] = useState([]);
    const [country, setCountry] = useState('United States')
    const [start, setStart] = useState(parseInt('1990'));
    const [end, setEnd] = useState(parseInt('2020'));
    const [range, setRange] = useState([1960, 2021])
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
    }, [country, range]);

    const handleSelect=(e)=>{
        console.log(e);
        setCountry(e)
      }
    
    const handleChange = (event, newValue) => {
        setRange(newValue);
        console.log(newValue)
        setStart(newValue[0]);
        setEnd(newValue[1]);
      };

    

  return (
      <>
      <div style={{display:'flex', alignItems:'center'}}>
      <DropdownButton  
            title={country}
            id="dropdown-menu-align-right"
            onSelect={handleSelect}
            >
                <Dropdown.Item eventKey = 'United States'>United States</Dropdown.Item>
                <Dropdown.Item eventKey = 'China'>China</Dropdown.Item>
                <Dropdown.Item eventKey = 'India'>India</Dropdown.Item>
                <Dropdown.Item eventKey = 'Ecuador'>Ecuador</Dropdown.Item>
        </DropdownButton>


        <Box sx={{ width: 300 }}>
        <Slider
            getAriaLabel={() => 'Year range'}
            defaultValue={[1960,2021]}
            value={range}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={1960}
            max={2021}
            getAriaValueText={()=> 'Year'}
        />
        </Box>

      </div>
       
        <h3><center>GDP chart for {country}</center></h3><br />
        <Chart
            chartType="Line"
            width="100%"
            height="400px"
            data={parsedCsvData}
        />
      </>

  );
}