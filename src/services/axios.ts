import axios from 'axios'

const baseUrlEc2 = "https://nodejs.blockchain-good-traceability.info.vn/";
const baseURLRender = "https://coffee-supply-chain.onrender.com/";
const local = "http://localhost:3000/"

const config = {
    baseURL: baseUrlEc2,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
}

export const axiosClient = axios.create(config);
