import { axiosClient } from "@/services/axios";

export const GetAllProduceAPI = async () => {
    try {
        const currentToken = localStorage.getItem('token');

        const res = await axiosClient.get(
            "/produce/",
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

export const GetProduceDetailByIdAPI = async (productionId: string) => {
    try {
        const currentToken = localStorage.getItem('token');

        const res = await axiosClient.get(
            "/produce/" + productionId,
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

export const UpdateProduceAPI = async (value: any, productionId: string) => {
    try {
        const currentToken = localStorage.getItem('token');

        const res = await axiosClient.patch(
            "/produce/" + productionId,
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