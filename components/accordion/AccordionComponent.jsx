import React, { useState } from 'react';

const AccordionComponent = ({ panels }) => {
    const [activePanel, setActivePanel] = useState(null);

    const togglePanel = (panelId) => {
        setActivePanel(activePanel === panelId ? null : panelId);
    };

    return (
        <div>
            {panels.map((panel) => (
                <div key={panel.id} className="accordion-panel">
                    <div
                        className={`accordion-header ${activePanel === panel.id ? 'active' : ''}`}
                        onClick={() => togglePanel(panel.id)}
                    >
                        {panel.title}
                    </div>
                    {activePanel === panel.id && (
                        <div className="accordion-content">
                            {panel.content}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AccordionComponent;
