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
            answers: `${appConfig.apiRequestUrl}/app/action/answers`,
            goal: `${appConfig.apiRequestUrl}/app/action/goal`,
            todo: `${appConfig.apiRequestUrl}/app/action/todo`,
            all: `${appConfig.apiRequestUrl}/app/action/all`,
        },
        roles: {
            my: `${appConfig.apiRequestUrl}/app/roles/my`,
            global: `${appConfig.apiRequestUrl}/app/roles/global`,
            certain: `${appConfig.apiRequestUrl}/app/roles`
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
        },
        roles: {
            select: `${appConfig.apiRequestUrl}/app/roles/select`,
            create: `${appConfig.apiRequestUrl}/app/roles/create`,
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
    delete: {
        roles: {
            role: `${appConfig.apiRequestUrl}/app/roles/delete/role`,
        }
    }
};

export default requests;