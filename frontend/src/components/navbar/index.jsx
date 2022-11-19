import React from "react";
import { useNavigate } from 'react-router-dom'

const sections = {
    "Macroeconomic (USD)": {
        navigateTo: '',
        subsections: [
            "GDP (USD)",
            "FDI Inflows (USD)",
            "FDI Outflows (USD)"
        ]
    },
    "Agricultural": {
        navigateTo: 'agricultural',
        subsections: [
            "GDP (USD)",
            "FDI Inflows (USD)",
            "FDI Outflows (USD)"
        ]
    },
    "Debt Services": {
        navigateTo: 'debt',
        subsections: [
            "Reserves",
            "GNI",
            "Total Debt (%)"
        ]
    },
    "Crops": {
        navigateTo: 'crops',
        subsections: [
            "Banana",
            "Mangos",
            "Walnuts"
        ]
    }
}

export default function Navbar() {

    const navigate = useNavigate();
    const [openSections, setOpenSections] = React.useState([]);

    const toggleSection = (sectionNumber) => {
        const newOpenSections = [...openSections]
        newOpenSections[sectionNumber] = openSections[sectionNumber] ? false : true;
        setOpenSections(newOpenSections);
    }

    return <div className="navbar">
        {
            Object.keys(sections).map((section, index) =>
                <div key={section}>
                    <div className="nav-main-item">
                        <span onClick={() => toggleSection(index)} className="nav-arrow">
                            {openSections[index] ? <span className="nav-right-arrow">&#9656;</span> : <span className="nav-down-arrow">&#9660;</span> }
                        </span>
                        <span className="nav-main-section" onClick={() => {navigate(sections[section].navigateTo)}}>{section}</span>
                    </div>
                    {!openSections[index] &&
                        <ul>
                            {
                                sections[section].subsections.map(subsection =>
                                    <li key={`${section}${subsection}`}>{subsection}</li>
                                )
                            }
                        </ul>
                    }
                </div>
            )
        }
        Import/Export Flow
    </div>
}