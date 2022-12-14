import React, {useState, useEffect} from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'
import { Chart } from "react-google-charts";
import csvFile from '../../data/fdi-out.csv';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import * as d3 from 'd3';


export default function FDI_OUT(props) {
    const [parsedCsvData, setParsedCsvData] = useState([]);
    const columns = ['Year', 'FDI Outflow',{ type: 'string', role:'annotation' }]
    const [selectedYear, setSelectedYear] = useState();
    const [selectedIndex, setSelectedIndex] = useState();
    const [annotationText, setAnnotationText] = useState();
    const [fr, setfr] = useState(localStorage.getItem("foodResearcher"));
    const [annotations, setAnnotations] = useState(
        () => {
            const ans = localStorage.getItem('fdiOutAnnotations')
            if (ans != null) return JSON.parse(ans)
        
            else {
              return []
            }
          });


        


    const fetchCsv = (country, start, end) => {
        const response = d3.csv(csvFile).then(response => {  
            var filteredData = response.filter(function(d) 
            { 
                if( d["Country Name"] === country)
                { 
                    let rows = [];
                    for (const [key, value] of Object.entries(d)){
                        if (parseInt(key)>=start && parseInt(key)<=end){
                            let row = [];
                            row.push(key);
                            row.push(parseFloat(value))
                            let index = annotations.findIndex((item => item.year === key));
                            if(index>=0){
                                row.push(annotations[index].annotation)
                            }
                            else
                            {
                                row.push('')
                            }

                            rows.push(row);
                        }
                    }
                    rows.slice(0, rows.length-5)
                    let datasource = [columns, ...rows]
                    setParsedCsvData(datasource)
                    return d;
                } 
            })
        })
        .catch(err => console.log(err))
    }

    const chartEvents = [
        {
          callback: ({ chartWrapper, google }) => {
            const chart = chartWrapper.getChart();
            google.visualization.events.addListener(
                chart,
                "select",
                e => {
                    // const chartObject = chart.getChart();
                    if (chart.getSelection()[0]){

                        getPointToYear(chart.getSelection()[0].row);
                    }

                }
              );
          },
          eventName: "ready"
        }
      ];

    useEffect(() => {
    
        fetchCsv(props.country, props.start, props.end);

    }, [props,fr,  `${annotations}`]);


    function annotate (e){
        // e.preventDefault();
        console.log(selectedYear, selectedIndex, annotationText);
        let ans = annotations;
        let index = ans.findIndex((item => item.year === selectedYear));
        if(index>=0){
            ans[index].annotation = annotationText;
        }
        else
        {
            ans.push(
                {
                    year: selectedYear,
                    annotation: annotationText
                }
            )
        }
        setAnnotations([...ans])
        localStorage.setItem("fdiOutAnnotations", JSON.stringify(ans));
        setSelectedYear(null);
        console.log("state", annotations)
    }
    function annotationTextBox () {
        return (
            <>
           <form onSubmit={annotate} >
                Add Annotation to Year {selectedYear} : 
                <input type='text' onChange = {(e)=> {setAnnotationText(e.target.value)}}/>
                <button type='submit'> Save</button>
                </form>
            </>)
    }

    async function getPointToYear(point){
        setfr(localStorage.getItem("foodResearcher"))
        const year_index = point + 1        
        const year= parsedCsvData[year_index][0]
        console.log(year_index, year)
        setSelectedYear(year)
        setSelectedIndex(year_index)

    }


    const options = {
        tooltip: { isHtml: true },
        annotations: {
            textStyle: {
              fontSize: 12,
              alwaysOutside: true
            }
          }

      };
    

    

  return (
    parsedCsvData &&
      <>
        <Chart
            chartType="LineChart"
            width="100%"
            height="200px"
            data={parsedCsvData}
            options = {options}
            chartEvents ={chartEvents}
        />
        <br></br>
        <p class="text-secondary" style = {{display: 'inline-block'}} >
        {(fr==="true")?
        (selectedYear!=null && annotationTextBox())
        :"Only food researchers can add annotations."}
        </p>
      </>

  );
}