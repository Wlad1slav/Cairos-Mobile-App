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
    async get<T>(request: string): Promise<T | undefined> {
        try {
            const response: AxiosResponse<T> = await axios.get(request);
            return response.data;
        } catch (error) {
            this.handleError(error);
            return undefined;
        }
    }

    /**
     * Makes a POST request.
     * @param request - URL of the request.
     * @param data - Data to be sent in the body of the request.
     * @returns Response data or undefined in case of an error.
     */
    async post<T>(request: string, data: Object): Promise<T | undefined> {
        try {
            const response: AxiosResponse<T> = await axios.post(request, data);
            return response.data;
        } catch (error) {
            this.handleError(error);
            return undefined;
        }
    }

    /**
     * Makes a PUT request.
     * @param request - URL of the request.
     * @param data - Data to be sent in the body of the request.
     * @returns Response data or undefined in case of an error.
     */
    async put<T>(request: string, data: Object): Promise<T | undefined> {
        try {
            const response: AxiosResponse<T> = await axios.put(request, data);
            return response.data;
        } catch (error) {
            this.handleError(error);
            return undefined;
        }
    }

    /**
     * Makes a DELETE request.
     * @param request - URL of the request.
     * @returns Response data or undefined in case of an error.
     */
    async delete<T>(request: string): Promise<T | undefined> {
        try {
            const response: AxiosResponse<T> = await axios.delete(request);
            return response.data;
        } catch (error) {
            this.handleError(error);
            return undefined;
        }
    }

    /**
     * Handles errors from HTTP requests.
     * @param error - Error object.
     */
    private handleError(error: any): void {
        if (axios.isAxiosError(error)) {
            console.error(`Error: ${error.response?.status} - ${error.response?.statusText}`);
            console.error(`Message: ${error.message}`);
        } else {
            console.error(`Error: ${error.message}`);
        }
    }
}

export default RequestAuthorized;
