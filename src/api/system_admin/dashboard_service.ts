import { axiosClient } from "@/services/axios";

const DashboardService = {
    getBasicInfo: async() => {
        try {
            const currentToken = localStorage.getItem('token');

            const res = await axiosClient.get(
                "/dashboard/",
                {
                    headers: { Authorization: `Bearer ${currentToken}` },
                }
            );

            return res;
        } catch (err) {
            return err;
        }
    },
    getProjectsPerMonth: async() => {
        try {
            const currentToken = localStorage.getItem('token');

            const res = await axiosClient.get(
                '/dashboard/project-per-month',
                {
                    headers: { Authorization: `Bearer ${currentToken}` },
                }
            );

            return res;
        } catch(err) {
            return err;
        }
    }
}

export default DashboardService;