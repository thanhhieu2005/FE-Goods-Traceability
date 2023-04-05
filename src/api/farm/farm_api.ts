import { axiosClient } from "../../services/axios";

const FarmServices = {
    getFarmDetailService : async (farmId: string) => {
        try {
            const currentToken = localStorage.getItem('token');
            const res = await axiosClient.get(
                "/farm/" + farmId,
                {
                    headers: { Authorization: `Bearer ${currentToken}` },
                }
            );
            return res;
        } catch (error) {
            return error;
        }
    },
    getAllFarmProjectsService : async (farmId: string) => {
        try {
            const currentToken = localStorage.getItem('token');
            const res = await axiosClient.get(
                '/farm-project/all/' + farmId,
                {
                    headers: { Authorization: `Bearer ${currentToken}` },
                }
            );
            return res;
        } catch (err) {
            return err;
        }
    },
};

export default FarmServices;