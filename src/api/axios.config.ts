import axios from "axios";
import { API_URLs } from "../constants/API_URLs";


const apiClient = axios.create({
    baseURL: "http://3.69.30.211/apibudget",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
})

apiClient.interceptors.response.use(
    (res) => res,
    async (error) => {
        const initialRequest = error.config;

        if (initialRequest?.url === API_URLs.REFRESH) {
            return Promise.reject(error);
        }
        if (
            error?.response?.status === 401 &&
            !initialRequest?._retry &&
            localStorage.getItem('token')
        ) {
            initialRequest._retry = true;

            try {
                const response = await axios.get(API_URLs.REFRESH, {
                    withCredentials: true,
                });

                localStorage.setItem('accessToken', response.data.accessToken);

                initialRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;

                return apiClient.request(initialRequest);
            } catch (refreshError) {
                localStorage.removeItem('accessToken');
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
export default apiClient;