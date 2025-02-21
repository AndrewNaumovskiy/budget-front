import axios from "axios";
import { API_URLs } from "../constants/API_URLs";

const refreshClient = axios.create({
    baseURL: "http://3.69.30.211/apibudget",
    headers: {
        'Content-Type': 'application/json'
    }
});

const apiClient = axios.create({
    baseURL: "http://3.69.30.211/apibudget",
    headers: {
        'Content-Type': 'application/json',
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
            !initialRequest?._retry

        ) {
            initialRequest._retry = true;

            try {

                const response = await refreshClient.post(API_URLs.REFRESH, {
                    refreshToken: localStorage.getItem('refreshToken')
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });


                localStorage.setItem('accessToken', response.data.data.accessToken);

                initialRequest.headers['Authorization'] = `Bearer ${response.data.data.accessToken}`;

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