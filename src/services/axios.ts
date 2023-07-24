import axios from 'axios'

const baseUrlEc2 = "https://nodejs.blockchain-good-traceability.info.vn/";
const baseURLRender = "https://coffee-supply-chain.onrender.com/";
const local = "http://localhost:3000/"

const baseURLEc2NotSSL = "https://ec2-54-65-79-156.ap-northeast-1.compute.amazonaws.com:3000/";

const config = {
    baseURL: baseURLEc2NotSSL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
}

export const axiosClient = axios.create(config);
