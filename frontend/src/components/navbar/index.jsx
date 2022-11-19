import React from "react";

export default function Navbar() {
    return <div className="navbar">
        <details open>
            <summary>
                Macroeconomic (USD)
            </summary>
            <ul>
                <li>GDP (USD)</li>
                <li>FDI Inflows (USD)</li>
                <li>FDI Outflows (USD)</li>
            </ul>
        </details>
        <details open>
            <summary>
                Agricultural
            </summary>
            <ul>
                <li>Contribution of Agri (%GDP)</li>
                <li>Credit</li>
                <li>Fertilizers</li>
                <li>Fertilizers PROD</li>
            </ul>
        </details>
        Import/Export Flow
    </div>
}