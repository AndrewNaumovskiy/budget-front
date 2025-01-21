import axios from "axios";


const apiClient = axios.create({
    baseURL: "http://3.69.30.211/apibudget",
    headers: {
        'Content-Type': 'application/json',
    },
})

export default apiClient;