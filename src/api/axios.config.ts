// axios.config.ts
import axios from "axios";
import { API_URLs } from "../constants/API_URLs";


let isRefreshing = false;
let refreshPromise: Promise<unknown> | null = null;
let refreshSubscribers: Array<(token: string) => void> = [];

function subscribeToRefresh(callback: (token: string) => void) {
    refreshSubscribers.push(callback);
}

function onRefreshed(token: string) {
    refreshSubscribers.forEach(callback => callback(token));
    refreshSubscribers = [];
}

function onRefreshFailure() {
    refreshSubscribers.forEach(callback => callback(''));
    refreshSubscribers = [];
}

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
});

apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

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

            if (isRefreshing) {
                try {
                    return new Promise((resolve, reject) => {
                        subscribeToRefresh((token) => {
                            if (token) {
                                initialRequest.headers['Authorization'] = `Bearer ${token}`;
                                resolve(apiClient.request(initialRequest));
                            } else {
                                reject(error);
                            }
                        });
                    });
                } catch (err) {
                    return Promise.reject(err);
                }
            }

            isRefreshing = true;
            refreshPromise = refreshClient.post(API_URLs.REFRESH, {
                refreshToken: localStorage.getItem('refreshToken')
            })
                .then(response => {
                    const newToken = response.data.data.accessToken;
                    localStorage.setItem('accessToken', newToken);

                    onRefreshed(newToken);

                    initialRequest.headers['Authorization'] = `Bearer ${newToken}`;
                    return apiClient.request(initialRequest);
                })
                .catch(refreshError => {
                    localStorage.removeItem('accessToken');
                    onRefreshFailure();
                    return Promise.reject(refreshError);
                })
                .finally(() => {
                    isRefreshing = false;
                    refreshPromise = null;
                });

            return refreshPromise;
        }

        return Promise.reject(error);
    }
);
export default apiClient;