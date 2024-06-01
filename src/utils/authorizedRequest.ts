import axios from "axios";

const request = async (token: string, request: string) => {

    // Configuring axios to add a token to each request
    axios.interceptors.request.use(
        config => {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        },
        error => Promise.reject(error)
    );

    try {
        const response = await axios.get(request);
        return response.data;
    } catch (error) {
        console.log(error);
        window.location.href = '/register';
    }
}

export default request;