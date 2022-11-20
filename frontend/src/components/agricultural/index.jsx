import React from "react";
import Chart1 from "./chart1";
import saudiCsvFile from '../../data/saudi-imports.csv';
import egyptCsvFile from '../../data/egypt-imports.csv';
import Papa from 'papaparse'

export default function Agricultural() {

    const saudiData = React.useRef(null);
    const egyptData = React.useRef(null);
    const currentData = React.useRef(null);

    const [crop, setCrop] = React.useState('wheat');

    const [year, setYear] = React.useState('2020');

    const [country, setCountry] = React.useState('Soudi Arabia');

    const handleCropChange = e => {
        setCrop(e.target.id);
        filterGraphData(e.target.id, year)
    }

    const handleYearChange = e => {
        setYear(e.target.value);
        filterGraphData(crop, e.target.value)
    }

    const handleCountryChange = e => {
        setCountry(e.target.value)
        if(e.target.value === 'Saudi Arabia') {
            currentData.current = saudiData.current;
        } else {
            currentData.current = egyptData.current;
        }
        filterGraphData(crop, year);
    }

    const isChecked = id => crop === id;

    const [graphData, setGraphData] = React.useState([]);

    const filterGraphData = (cropName, year) => {
        const cropNameMap = {
            rice: 'Rice',
            corn: 'Maize (corn)',
            wheat: 'Wheat',
            mangos: 'Mangoes, guavas and mangosteens',
            walnuts: 'Walnuts, shelled',
            bananas: 'Bananas'
        }
        if(currentData.current !== null) {
            const newGraphData = currentData.current
                .filter(row => (
                    row.Unit === 'tonnes' &&
                    row['Year Code'] === year &&
                    row.Item === cropNameMap[cropName] &&
                    !isNaN(parseInt(row.Value))
                ))
                .map(row => ([
                    row['Reporter Countries'],
                    row['Partner Countries'],
                    parseInt(row['Value'])
                ]))
            setGraphData([
                ["From", "To", "Weight in Tonnes"],
                ...newGraphData
            ]);
        }
    }

    const loadData = async (file, saudi) => {
        const response = await fetch(file)
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const csv = decoder.decode(result.value);
        const results = Papa.parse(csv, { header: true })
        const rows = results.data;
        if (rows.length > 0) {
            if(saudi) {
                saudiData.current = rows;
                currentData.current = rows;
                filterGraphData(crop, year)
            } else {
                egyptData.current = rows;
            }
        }
    }

    React.useEffect(() => {
        loadData(saudiCsvFile, true)
        loadData(egyptCsvFile, false)
    }, [])

    return <div>
        <div className="agricultural-topbar">
            <label for="year">Year: </label>
            <select id="year" value={year} onChange={handleYearChange}>
                {
                    Array.from({ length: (2020 - 1986 + 1) }, (v, k) => `${2020 - k}`)
                        .map(year => <option value={year}>{year}</option>)
                }
            </select>
            &nbsp;&nbsp;
            <label for="country">Country: </label>
            <select id="country" value={country} onChange={handleCountryChange}>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Egypt">Egypt</option>
            </select>
            <br/>
            <br/>
            <input onChange={handleCropChange} id="wheat" type="radio" name="crop" checked={isChecked('wheat')}></input>
            <label for="wheet">Wheat</label>
            <input onChange={handleCropChange} id="rice" type="radio" name="crop" checked={isChecked('rice')}></input>
            <label for="rice">Rice</label>
            <input onChange={handleCropChange} id="corn" type="radio" name="crop" checked={isChecked('corn')}></input>
            <label for="corn">Corn</label>
            <input onChange={handleCropChange} id="mangos" type="radio" name="crop" checked={isChecked('mangos')}></input>
            <label for="mangos">Mangos</label>
            <input onChange={handleCropChange} id="walnuts" type="radio" name="crop" checked={isChecked('walnuts')}></input>
            <label for="walnuts">Walnuts</label>
            <input onChange={handleCropChange} id="bananas" type="radio" name="crop" checked={isChecked('bananas')}></input>
            <label for="bananas">Bananas</label>
        </div>
        <Chart1 data={graphData} />
    </div>
}