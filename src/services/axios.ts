import axios from 'axios'

const baseUrlEc2 = "https://ec2-13-231-4-216.ap-northeast-1.compute.amazonaws.com:3000/";
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
