import { axiosClient } from "@/services/axios";

export const GetTransportDetailByIdAPI = async (transportId: string) => {
    try {

        const currentToken = localStorage.getItem('token');

        const res = await axiosClient.get(
            "/transport/" + transportId,
            {
                headers: { Authorization: `Bearer ${currentToken}` },
            }
        );
        return res;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export const UpdateTransportAPI = async (value: any, transportId: string ) => {
    try {
        const currentToken = localStorage.getItem('token');

        const res = await axiosClient.patch(
            "/transport/" + transportId,
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

const TransportServices = {
    getAllTransportByID: async(userId: string) => {
        try {
            const currentToken = localStorage.getItem('token');

            const res = await axiosClient.get(
                "/transport/all-by-user/",
                {
                    headers: { Authorization: `Bearer ${currentToken}` },
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

export default TransportServices;