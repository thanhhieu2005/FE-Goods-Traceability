import axios from 'axios'

const config = {
    baseURL: "https://coffee-supply-chain.herokuapp.com",
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
}

export const axiosClient = axios.create(config);
