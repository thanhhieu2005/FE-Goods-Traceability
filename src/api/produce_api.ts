import { axiosClient } from "@/services/axios";

export const GetAllProduceAPI = async () => {
  try {
    const currentToken = localStorage.getItem("token");

    const res = await axiosClient.get("/produce/", {
      headers: { Authorization: `Bearer ${currentToken}` },
    });

    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetProduceDetailByIdAPI = async (productionId: string) => {
  try {
    const currentToken = localStorage.getItem("token");

    const res = await axiosClient.get("/produce/" + productionId, {
      headers: { Authorization: `Bearer ${currentToken}` },
    });
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const UpdateProduceAPI = async (value: any, productionId: string) => {
  try {
    const currentToken = localStorage.getItem("token");

    const res = await axiosClient.patch("/produce/" + productionId, value, {
      headers: { Authorization: `Bearer ${currentToken}` },
    });
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const ProductionSupervisionServices = {
  getAllProductionSupervisionProjectsByUser: async (userId: string) => {
    try {
      const currentToken = localStorage.getItem("token");

      const res = await axiosClient.get("/produce/all-by-user", {
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
  createNewProduct: async (value: any) => {
    try {
      const currentToken = localStorage.getItem("token");

      const res: any = await axiosClient.post("/product/", value, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
          "Content-Type": 'multipart/form-data',
        },
      });

      return res;
    } catch (err) {
      return err;
    }
  },
};

export default ProductionSupervisionServices;
