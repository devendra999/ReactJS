import React from 'react';
import AccordionComponent from './AccordionComponent';

const ParentComponent = () => {
    const panels = [
        {
            id: 'panel1',
            title: 'Panel 1',
            content: <p>Content of Panel 1</p>,
        },
        {
            id: 'panel2',
            title: 'Panel 2',
            content: <p>Content of Panel 2</p>,
        },
        {
            id: 'panel3',
            title: 'Panel 3',
            content: <p>Content of Panel 3</p>,
        },
    ];

    return (
        <div>
            <AccordionComponent panels={panels} />
        </div>
    );
};

export default ParentComponent;
