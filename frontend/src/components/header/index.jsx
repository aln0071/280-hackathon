import React from "react";
import logo from '../../logo.svg';

export default function Header() {
    return <div className="header">
        <img alt="logo" src={logo} width={80} />
        <h3 className="page-header">Food Security Time Series Dashboard</h3>
        <div className="country-flag">country flag</div>
    </div>
}