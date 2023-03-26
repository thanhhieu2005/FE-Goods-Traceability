import { axiosClient } from "@/services/axios";

const UserManagementService = {
    getAllUserService : async() => {
        try {
            const currentToken = localStorage.getItem('token');
            const res = await axiosClient.get(
                '/users/',
                {
                    headers: { Authorization: `Bearer ${currentToken}` },
                }
            );
            return res;
        } catch (err) {
            return err;
        }
    },
    getDetailUserByIdService : async(userId: string) => {
        try {
            const currentToken = localStorage.getItem('token');
            const res = await axiosClient.get(
                '/user/' + userId,
                {
                    headers: { Authorization: `Bearer ${currentToken}` },
                }
            );
            return res;
        } catch (err) {
            return err;
        }
    },
    createNewUserService : async(value: any) => {
        try {
            const currentToken = localStorage.getItem('token');
            const res = await axiosClient.post(
                '/users',
                value,
                {
                    headers: { Authorization: `Bearer ${currentToken}` },
                }
            );
            return res;
        } catch (err) {
            return err;
        }
    },
    deleteUserService : async (userId: string) => {
        try {
            const currentToken = localStorage.getItem('token');
            const res = await axiosClient.delete(
                '/users/' + userId,
                {
                    headers: { Authorization: `Bearer ${currentToken}` },
                }
            );
            return res;
        } catch (err) {
            return err;
        }
    }
}

export default UserManagementService;