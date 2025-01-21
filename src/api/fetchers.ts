import apiClient from "./axios.config";

export const getFetcher = (url: string) => apiClient.get(url, {
    headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
    }
}).then((res) => res.data);
export const postFetcher = (url: string, payload: Record<string, unknown>) => apiClient.post(url, payload).then((res) => res.data);
export const putFetcher = (url: string, payload: Record<string, unknown>) => apiClient.put(url, payload).then((res) => res.data);
export const deleteFetcher = (url: string) => apiClient.delete(url).then((res) => res.data);