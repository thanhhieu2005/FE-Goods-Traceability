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
        console.log(res);
        return res;
    } catch (err) {
        console.log(err);
    }
}

export default RefreshUserAPI;