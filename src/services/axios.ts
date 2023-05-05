import axios from 'axios'

const baseURLAWS = "http://13.231.245.116:3000/";
const baseURLRender = "https://coffee-supply-chain.onrender.com/";
const local = "http://localhost:3000/"

const config = {
    baseURL: baseURLRender,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
}

export const axiosClient = axios.create(config);
