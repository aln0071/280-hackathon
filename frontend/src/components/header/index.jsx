import React,{useState} from "react";
import logo from '../../logo.svg';
import Form from 'react-bootstrap/Form';

export default function Header() {    
    const [persona,setPersona]=useState(false)
    const handleChange =(e)=>{
        console.log(e.target.checked)
        setPersona(e.target.checked)
        localStorage.setItem("foodResearcher",e.target.checked)
    }

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
        />
        </Form>
        Persona : {persona?"Food Security Researcher": "Govternment Representative"}


        </div>
    </div>
}