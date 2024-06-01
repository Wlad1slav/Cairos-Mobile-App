import appConfig from "../../app.config";

interface RequestsConfig {
    get: {
        profile: {
            data: string;
        };
        todos: {
            newTodo: string;
        };
    };
    post: {
        auth: {
            register: string;
            login: string;
        };
    };
    pull: {
        todos: {
            changeStatus: string;
        };
    };
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
            login: '',
        }
    },
    pull: {
        todos: {
            changeStatus: ''
        }
    },
    delete: {}
};

export default requests;