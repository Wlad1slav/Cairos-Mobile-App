import axios, { AxiosResponse } from "axios";

/**
 * Class for making authorized HTTP requests using Axios.
 */
class RequestAuthorized {
    private readonly token: string;

    /**
     * @param token - Authorization token.
     */
    constructor(token: string) {
        this.token = token;
        axios.interceptors.request.use(
            config => {
                config.headers.Authorization = `Bearer ${this.token}`;
                return config;
            },
            error => Promise.reject(error)
        );
    }

    /**
     * Makes a GET request.
     * @param request - URL of the request.
     * @returns Response data or undefined in case of an error.
     */
    async get<T>(request: string): Promise<T> {
        const response: AxiosResponse<T> = await axios.get(request);
        return response.data;
    }

    /**
     * Makes a POST request.
     * @param request - URL of the request.
     * @param data - Data to be sent in the body of the request.
     * @returns Response data or undefined in case of an error.
     */
    async post<T>(request: string, data: Object): Promise<T | undefined> {
        const response: AxiosResponse<T> = await axios.post(request, data);
        return response.data;
    }

    /**
     * Makes a PUT request.
     * @param request - URL of the request.
     * @param data - Data to be sent in the body of the request.
     * @returns Response data or undefined in case of an error.
     */
    async put<T>(request: string, data: Object): Promise<T> {
        const response: AxiosResponse<T> = await axios.put(request, data);
        return response.data;
    }

    /**
     * Makes a DELETE request.
     * @param request - URL of the request.
     * @returns Response data or undefined in case of an error.
     */
    async delete<T>(request: string): Promise<T | undefined> {
        const response: AxiosResponse<T> = await axios.delete(request);
        return response.data;
    }
}

export default RequestAuthorized;
