// Accordion.js
import React, { useState } from 'react';

const Toggle = (props) => {
    const [expanded, setExpanded] = useState(false);
    const { title, children } = props;

    const toggleAccordion = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="accordion-container">
            <h4 className={`${expanded ? 'active header' : 'header'}`} onClick={toggleAccordion}>
                {title}
            </h4>
            {expanded && <div className={`${expanded ? 'content active' : 'content'}`}>{children}</div>}
        </div>
    );
};

export default Toggle;
