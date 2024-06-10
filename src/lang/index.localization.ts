import appConfig from "../config/app.config";

const loadLocalization = (language: string) => {
    switch (language) {
        case 'ua':
            return import('./ua/localization');
        case 'en':
            return import('./en/localization');
        default:
            return import('./en/localization');
    }
};

export default loadLocalization;
