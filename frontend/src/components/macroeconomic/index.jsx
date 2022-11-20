import React, {useState, useEffect} from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'
import GDP from "./gdp";
import FDI_IN from "./fdi-in";
import FDI_OUT from "./fdi-out";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';


export default function MacroEconomic() {
    const [country, setCountry] = useState('United States')
    const [start, setStart] = useState(parseInt('1990'));
    const [end, setEnd] = useState(parseInt('2020'));
    const [range, setRange] = useState([1960, 2021])

    
    const handleSelect=(e)=>{
        setCountry(e)
      }
    
    const handleChange = (event, newValue) => {
        setRange(newValue);
        setStart(newValue[0]);
        setEnd(newValue[1]);
      };

   
      useEffect(() => {
    }, [country, range]);



    return(
        <div style={{padding:'20px', paddingLeft:'50px'}}>
            <h3><center>Macroeconomic charts for {country}</center></h3><br />

             <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between',alignItems:'center', flexWrap:'wrap', padding:'10px'}}>
                    <DropdownButton  
                        title={country}
                        id="dropdown-menu-align-right"
                        variant="secondary"
                        onSelect={handleSelect}
                    >
                            <Dropdown.Item eventKey = 'United States'>United States</Dropdown.Item>
                            <Dropdown.Item eventKey = 'China'>China</Dropdown.Item>
                            <Dropdown.Item eventKey = 'India'>India</Dropdown.Item>
                            <Dropdown.Item eventKey = 'Ecuador'>Ecuador</Dropdown.Item>
                    </DropdownButton>


                    <Box sx={{ width: 300 }}>
                    <Typography id="non-linear-slider" gutterBottom> 
                        Year
                    </Typography>
                    <Slider
                        getAriaLabel={() => 'Year range'}
                        defaultValue={[1960,2021]}
                        value={range}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        min={1960}
                        max={2021}
                        getAriaValueText={()=> 'Year'}
                        color='secondary'
                    />
                    </Box>

      </div>
            <GDP country = {country} start={start} end = {end} />
            <br />
            <FDI_IN country = {country} start={start} end = {end} />
            <br />
            <FDI_OUT country = {country} start={start} end = {end} />
        </div>
    )
}