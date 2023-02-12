import { axiosClient } from "@/services/axios";

export const GetAllTransportAPI = async () => {
    try {
        const currentToken = localStorage.getItem('token');

        const res = await axiosClient.get(
            "/shipping/",
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

export const GetTransportDetailByIdAPI = async (transportId: string) => {
    try {

        const currentToken = localStorage.getItem('token');

        const res = await axiosClient.get(
            "/shipping/" + transportId,
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
            "/shipping/" + transportId,
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