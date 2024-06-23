import routes from "./routes.config";
import {home, person, star, sync} from "ionicons/icons";

interface NavigationElement {
    label: string;
    href: string;
    icon: string;
}

interface NavigationConfig {
    [key: string]: NavigationElement;
}

const navigationElements: NavigationConfig = {
    home: {
        label: 'Головна',
        href: routes.base.url,
        icon: home
    },
    todos: {
        label: 'Ролі',
        href: '/roles',
        icon: sync
    },
    usersRating: {
        label: 'Рейтинг',
        href: routes.usersRating.url,
        icon: star
    },
    userProfile: {
        label: 'Профіль',
        href: routes.userProfile.url,
        icon: person
    },
}

export default navigationElements;