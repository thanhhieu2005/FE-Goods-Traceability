import { AxiosError } from "axios";
import { axiosClient } from "../services/axios";

const RefreshUserAPI = async () => {
    try {
        const currentToken = localStorage.getItem('token');

        const res = await axiosClient.get(
            "/users/me",
            {
              headers: { Authorization: `Bearer ${currentToken}` },
            }
        );
        return res;
    } catch (err) {
        console.log(err);
    }
}

export default RefreshUserAPI;