import { axiosClient } from "@/services/axios";


const StaffServices = {
    getAllStaffByDepartment : async (deparment: number) => {
        try {
            const currentToken = localStorage.getItem('token');
            const res = await axiosClient.get(
                "/users/department/" + deparment,
                {
                    headers: { Authorization: `Bearer ${currentToken}` },
                }
            );

            return res;
        } catch (err) {
            return err;
        }
    },
    getAllDepartmentUser : async() => {
        try {
            const currentToken = localStorage.getItem('token');
            const res = await axiosClient.get(
                '/users/role/4',
                {
                    headers: { Authorization: `Bearer ${currentToken}` },
                }
            );

            return res;
        } catch (err) {
            return err;
        }
    },
    createNewStaff : async(value: any) => {
        try {
            const currentToken = localStorage.getItem('token');
            const res = await axiosClient.post(
                '/users',
                value,
                {
                    headers: { Authorization: `Bearer ${currentToken}` },
                },
                
            );

            return res;
        } catch (err) {
            return err;
        }
    },
    updateProfileUser : async(value: any, userId: string) => {
        try {
            const currentToken = localStorage.getItem('token');
            const res = await axiosClient.patch(
                '/users/' + userId,
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
};

export default StaffServices;