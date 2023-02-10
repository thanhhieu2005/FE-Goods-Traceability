import { axiosClient } from "@/services/axios";

export const GetAllProjectAPI = async () => {
    try {

        const currentToken = localStorage.getItem('token');

        const res = await axiosClient.get(
            "/project/",
            {
                headers: { Authorization: `Bearer ${currentToken}` },
            }
        );
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const GetProjectDetailByID = async (projectId: string) => {
    try {

        const currentToken = localStorage.getItem('token');

        const res = await axiosClient.get(
            "/project/" + projectId,
            {
                headers: { Authorization: `Bearer ${currentToken}` },
            }
        );
        console.log("Đã fetch");
        return res;
    } catch (err) {
        console.log(err);
    }
};