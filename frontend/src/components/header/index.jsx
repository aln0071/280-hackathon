import React,{useState, useEffect} from "react";
import logo from '../../logo.svg';
import Form from 'react-bootstrap/Form';

export default function Header() {    
    console.log("persona",localStorage.getItem('foodResearcher'))
    const [persona,setPersona]=useState(localStorage.getItem('foodResearcher'))
    const handleChange =(e)=>{
        console.log(e.target.checked)
        setPersona(e.target.checked)
        localStorage.setItem("foodResearcher",e.target.checked)
        window.location.reload();
    }
    useEffect(() => {
    }, [persona])

    return <div className="header">
        <img alt="logo" src={logo} width={80} />
        <h3 className="page-header">Food Security Time Series Dashboard</h3>
        <div className="country-flag">
        <br></br>
        <Form>
        <Form.Check 
            type="switch"
            id="custom-switch"
            onChange={handleChange}
            defaultChecked={persona==='true'? true: false}
        />
        </Form>
        Persona : 
        {persona && persona==='true'?"Food Security Researcher": "Government Representative"}


        </div>
    </div>
}