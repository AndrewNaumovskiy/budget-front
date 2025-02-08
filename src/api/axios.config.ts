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
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            try {
                await fetch(API_URLs.REFRESH, {
                    method: 'POST',
                    credentials: 'include'
                });
                return apiClient(error.config);
            } catch {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);
export default apiClient;