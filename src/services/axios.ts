import axios from 'axios'

const config = {
    baseURL: "http://13.231.245.116:3000/",
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
}

export const axiosClient = axios.create(config);
