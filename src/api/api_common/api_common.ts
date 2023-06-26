import { axiosClient } from "@/services/axios";

const ApiCommonService = {
    resetPassword : async (email: string) => {
        try {
            const currentToken = localStorage.getItem('token');
            const res = await axiosClient.get(
                "/users/reset-password",
                {
                    headers: { Authorization: `Bearer ${currentToken}` },
                    params: {
                        email: email,
                    }
                }
            );
            return res;
        } catch (error) {
            return error;
        }
    },
}

export default ApiCommonService;