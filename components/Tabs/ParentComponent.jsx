import React from 'react';
import TabsComponent from './TabsComponent';

const ParentComponent = () => {
    const tabs = [
        {
            id: 'tab1',
            label: 'Tab 1',
            content: <p>Content of Tab 1</p>,
        },
        {
            id: 'tab2',
            label: 'Tab 2',
            content: <p>Content of Tab 2</p>,
        },
        {
            id: 'tab3',
            label: 'Tab 3',
            content: <p>Content of Tab 3</p>,
        },
    ];

    return (
        <div>
            <TabsComponent tabs={tabs} />
        </div>
    );
};

export default ParentComponent;
