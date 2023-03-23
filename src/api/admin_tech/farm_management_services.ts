import { axiosClient } from "../../services/axios";

const currentToken = localStorage.getItem('token');

const FarmManagementService = {
        
    getAllFarmService : async () => {
        try {
            const currentToken = localStorage.getItem('token');

            const result = await axiosClient.get(
                '/farm/',
                {
                    headers: { Authorization: `Bearer ${currentToken}` },
                }
            );

            return result;
        } catch (error) {
            return error;
        }
    },
    getFarmDetailService : async (farmId: string) => {
        try {
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
    updateFarmInfoService : async (farmId : string, value: any) => {
        try {
            const res = await axiosClient.patch(
                '/farm/' + farmId,
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
    deleteFarmService : async (farmId: string) => {
        try{
            const res = await axiosClient.delete(
                '/farm/' + farmId,
                {
                    headers: { Authorization: `Bearer ${currentToken}` },
                }
            );
            return res;
        } catch (err) {
            return err;
        }
    },
    createNewFarmService : async (value : any) => {
        try {
            const res = await axiosClient.post(
                '/farm/',
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
    updateFarmerIntoFarmService : async (email : string, farmId: string) => {
        try {
            const res = await axiosClient.post(
                '/famr/add-farmer/' + farmId,
                email,
                {
                    headers: { Authorization: `Bearer ${currentToken}` },
                }
            );
            return res;
        } catch (err) {
            return err;
        }
    },
    removeFarmerToFarmService : async (email: string, farmId: string) => {
        try {
            const res = await axiosClient.post(
                '/farm/remove-farmer/' + farmId,
                email,
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


export default FarmManagementService;
 