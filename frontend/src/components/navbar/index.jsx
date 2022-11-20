import React from "react";
import { useNavigate } from 'react-router-dom'
import arrowRight from '../../icons/arrow-right.svg';
import arrowDown from '../../icons/arrow-down.svg';

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
        subsections: []
    },
    // "Debt Services": {
    //     navigateTo: 'debt',
    //     subsections: [
    //         "Reserves",
    //         "GNI",
    //         "Total Debt (%)"
    //     ]
    // },
    "Crops": {
        navigateTo: 'crops',
        subsections: [
            {
                label: "Banana",
                navigateTo: "crops"
            },
            {
                label: "Mangos",
                navigateTo: "crops-mango"
            },
            {
                label: "Walnuts",
                navigateTo: "crops-walnut"
            }
        ]
    },
    "Speciality Crops": {
        navigateTo: 'walnuts-iran',
        subsections: [
            {
                label: "Walnuts Iran",
                navigateTo: "walnuts-iran"
            },
            {
                label: "Philippines - Mangos",
                navigateTo: "philippines-mango"
            },
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

    return <div className="my-navbar">
        {
            Object.keys(sections).map((section, index) =>
                <div key={section}>
                    <div className="nav-main-item">
                        <span onClick={() => toggleSection(index)} className="nav-arrow">
                            {openSections[index] ? <img src={arrowRight} width={10} alt="arrow-right" /> : <img src={arrowDown} width={10} alt="arrow-down" /> }
                        </span>
                        <span className="nav-main-section" onClick={() => {navigate(sections[section].navigateTo)}}>{section}</span>
                    </div>
                    {!openSections[index] &&
                        <ul>
                            {
                                sections[section].subsections.map(subsection => {
                                    if(typeof subsection === 'string') {
                                        return <li key={`${section}${subsection}`} draggable>{subsection}</li>
                                    } else {
                                        return <li key={`${section}${subsection.label}`} onClick={() => navigate(subsection.navigateTo)}>{subsection.label}</li>
                                    }
                                }
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