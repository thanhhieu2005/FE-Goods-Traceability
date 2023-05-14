import { axiosClient } from "@/services/axios";
import { AxiosError } from "axios";

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
        return err;
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
        return res;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const CreateNewProjectService = async (value : any) => {
    try {
        const currentToken = localStorage.getItem('token');

        console.log(currentToken);
        
        const res = await axiosClient.post(
            "/project/",
            value,
            {
                headers: { Authorization: `Bearer ${currentToken}` },
            },
        );
        return res;
    } catch (err : any) {
        console.log("Test", err);
        if(err === AxiosError) return err.response;
        return err;
    }
};

export const UpdateProjectState = async (value: any, projectId: string) => {
    try{
        const currentToken = localStorage.getItem('token');

        const res = await axiosClient.patch(
            "/project/" + projectId,
            value,
            {
                headers: { Authorization: `Bearer ${currentToken}`},
            },
        );
        return res;
    } catch (err) {
        console.log(err);
        return err;
    }
};