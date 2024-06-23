import React from "react";

import './AppTabs.scss';

interface Tab {
    label: string;
    url: string;
}

const AppTabs: React.FC<{
    tabs: Tab[]
}> = ({tabs}) => {

    return (
        <div className="tabs">
            {
                tabs.map((tab) => {
                    const currentUrl = new URL(window.location.href);
                    const isSelected = currentUrl.pathname === tab.url;

                    return <a key={tab.label} href={tab.url} className={`tab ${isSelected ? 'selected' : ''}`}>
                        {tab.label}
                    </a>
                })
            }
        </div>
    );
}

export default AppTabs;