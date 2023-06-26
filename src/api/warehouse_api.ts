import { axiosClient } from "@/services/axios";

export const GetAllWarehouseStorageAPI = async () => {
  try {
    const currentToken = localStorage.getItem("token");

    const res = await axiosClient.get("/warehouse-storage/", {
      headers: { Authorization: `Bearer ${currentToken}` },
    });

    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetWarehouseDetailByIdAPI = async (warehouseStorageId: string) => {
  try {
    const currentToken = localStorage.getItem("token");

    const res = await axiosClient.get(
      "/warehouse-storage/" + warehouseStorageId,
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
};

export const UpdateWarehouseDetailByIdAPI = async (
  value: any,
  warehouseStorageId: string
) => {
  try {
    const currentToken = localStorage.getItem("token");

    const res = await axiosClient.patch(
      "/warehouse-storage/" + warehouseStorageId,
      value,
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
};

const WarehouseStorageServices = {
  getAllWarehouseProjectByUserId: async (userId: string) => {
    try {
      const currentToken = localStorage.getItem("token");

      const res = await axiosClient.get("/warehouse-storage/all-by-user", {
        headers: { Authorization: `Bearer ${currentToken}` },
        params: {
          userId: userId,
        },
      });

      return res;
    } catch (err) {
      return err;
    }
  },
};

export default WarehouseStorageServices;
