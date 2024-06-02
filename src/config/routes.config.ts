import React from "react";
import TabHome from "../pages/TabHome";
import TabTodos from "../pages/TabTodos";
import TabRating from "../pages/TabRating";
import TabProfile from "../pages/TabProfile";
import TabRegistration from "../pages/TabRegistration";
import TabAuthorization from "../pages/TabAuthorization";

interface RouteObject {
    url: string;
    tabComponent: React.FC;
}

interface RoutesConfig {
    [key: string]: RouteObject;
}

const routes: RoutesConfig = {
    base: {
        url: '/home',
        tabComponent: TabHome
    },
    todo: {
        url: '/todos',
        tabComponent: TabTodos
    },
    usersRating: {
        url: '/rating',
        tabComponent: TabRating
    },
    userProfile: {
        url: '/profile',
        tabComponent: TabProfile
    },
    registration: {
        url: '/register',
        tabComponent: TabRegistration
    },
    authorization: {
        url: '/login',
        tabComponent: TabAuthorization
    },
}

export default routes;