import { axiosClient } from "@/services/axios";

export const GetAllHarvestAPI = async () => {
    try {
        const currentToken = localStorage.getItem('token');

        const res = await axiosClient.get(
            "/harvest/",
            {
                headers: { Authorization: `Bearer ${currentToken}` },
            }
        );
        
        console.log(res);
        return res;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export const GetHarvestDetailByIdAPI = async (harvestId: string) => {
    try {
        const currentToken = localStorage.getItem('token');

        const res = await axiosClient.get(
            "/harvest/" + harvestId,
            {
                headers: { Authorization: `Bearer ${currentToken}`},
            }
        );
        return res;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export const UpdateHarvestAPI = async (value: any, harvestId: string) => {
    try {
        const currentToken = localStorage.getItem('token');

        const res = await axiosClient.patch(
            "/harvest/" + harvestId,
            value,
            {
                headers: { Authorization: `Bearer ${currentToken}`},
            }
        );
        console.log(res);
        return res;
    } catch (err) {
        console.log(err);
        return err;
    }
}

const HarvestServices = {
    getAllHarvestByID: async(userId: string) => {
        try {
            const currentToken = localStorage.getItem('token');
            
            const res = await axiosClient.get(
                "/harvest/all-by-user",
                {
                    headers: { Authorization: `Bearer ${currentToken}`},
                    params: {
                        userId: userId,
                    }
                }
            );

            return res;
        } catch(err) {
            return err;
        }
    }
}

export default HarvestServices;