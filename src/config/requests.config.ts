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
        },
        actions: {
            question: `${appConfig.apiRequestUrl}/app/action/question`,
            goal: `${appConfig.apiRequestUrl}/app/action/goal`,
            todo: `${appConfig.apiRequestUrl}/app/action/todo`,
            all: `${appConfig.apiRequestUrl}/app/action/all`,
        }
    },
    post: {
        auth: {
            register: `${appConfig.apiRequestUrl}/app/user/register`,
            login: `${appConfig.apiRequestUrl}/app/user/login`,
        },
        concentration: {
            store: `${appConfig.apiRequestUrl}/app/concentration/store`
        },
        actions: {
            answer: `${appConfig.apiRequestUrl}/app/action/answer`
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