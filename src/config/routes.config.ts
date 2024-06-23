import React from "react";
import TabHome from "../pages/TabHome";
import TabRating from "../pages/TabRating";
import TabProfile from "../pages/TabProfile";
import TabRegistration from "../pages/TabRegistration";
import TabAuthorization from "../pages/TabAuthorization";
import TabFillPersonalInfo from "../pages/TabFillPersonalInfo";
import TabRoles from "../pages/RoleTabs/TabRoles";
import TabRoleSelectOwn from "../pages/RoleTabs/TabRoleSelectOwn";
import TabRoleSelectGlobal from "../pages/RoleTabs/TabRoleSelectGlobal";

interface RouteObject {
    url: string;
    tabComponent: React.FC;
}

interface RoutesConfig {
    [key: string]: RouteObject;
}

const routes: RoutesConfig = {
    // Authorization
    registration: {
        url: '/register',
        tabComponent: TabRegistration
    },
    authorization: {
        url: '/login',
        tabComponent: TabAuthorization
    },

    // Settings

    // Profile
    userProfile: {
        url: '/profile',
        tabComponent: TabProfile
    },
    userPersonal: {
        url: '/profile/personal',
        tabComponent: TabFillPersonalInfo
    },

    // Other
    base: {
        url: '/home',
        tabComponent: TabHome
    },
    usersRating: {
        url: '/rating',
        tabComponent: TabRating
    },

    // Roles
    roles: {
        url: '/roles',
        tabComponent: TabRoles
    },
    roleSelectOwn: {
        url: '/roles/select/own',
        tabComponent: TabRoleSelectOwn
    },
    roleSelectGlobal: {
        url: '/roles/select/global',
        tabComponent: TabRoleSelectGlobal
    },
}

export default routes;