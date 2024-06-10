import appConfig from "./app.config";

interface RequestsConfig {
    get: Record<string, any>;
    post: Record<string, any>;
    pull: Record<string, any>;
    delete: Record<string, any>;
}

const requests: RequestsConfig = {
    get: {
        profile: {
            data: `${appConfig.apiRequestUrl}/app/user/profile`
        },
        todos: {
            newTodo: ''
        }
    },
    post: {
        auth: {
            register: `${appConfig.apiRequestUrl}/app/user/register`,
            login: `${appConfig.apiRequestUrl}/app/user/login`,
        }
    },
    pull: {
        todos: {
            changeStatus: `${appConfig.apiRequestUrl}/app/user/profile/update/personal`,
        },
        profile: {
            update: `${appConfig.apiRequestUrl}/app/user/profile/update/personal`,
        }
    },
    delete: {}
};

export default requests;