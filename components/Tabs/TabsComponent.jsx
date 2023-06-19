import React, { useState } from 'react';

const TabsComponent = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <div>
            <div className="tab-buttons">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        className={activeTab === tab.id ? 'active' : ''}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="tab-content">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={activeTab === tab.id ? 'active' : 'hidden'}
                    >
                        {tab.content}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TabsComponent;
