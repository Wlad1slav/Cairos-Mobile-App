import React from "react";

import routes from "../../config/routes.config";
import AppTabs from "../general/AppTabs";

const RoleTabs: React.FC = () => {
    return (
        <AppTabs tabs={[
            {
                label: 'Мій список',
                url: routes.roleSelectOwn.url,
            },
            {
                label: 'Глобальні ролі',
                url: routes.roleSelectGlobal.url,
            },
        ]} />
    )
}

export default RoleTabs;
