// ParentComponent.js
import React from 'react';
import Accordion from './Toggle';

const Index = () => {
    return (
        <div>
            <h1>Toggle Example</h1>

            <Accordion title="Section 1">
                <p>Content of section 1 goes here.</p>
            </Accordion>

            <Accordion title="Section 2">
                <p>Content of section 2 goes here.</p>
            </Accordion>

            {/* Other components */}
        </div>
    );
};

export default Index;
