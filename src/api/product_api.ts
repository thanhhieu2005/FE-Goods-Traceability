import { axiosClient } from "@/services/axios";

const ProductServices = {
  getDetailProduct: async (projectId: string) => {
    try {
      const currentToken = localStorage.getItem("token");

      const res: any = await axiosClient.get("/product/all-by-project", {
        headers: { Authorization: `Bearer ${currentToken}` },
        params: {
          projectId: projectId,
        },
      });

      return res;
    } catch (err) {
      return err;
    }
  },
  approveProduct: async (
    projectId: string,
    productId: string,
  ) => {
    try {
      const currentToken = localStorage.getItem("token");

      const res: any = await axiosClient.patch(
        "/product/" + productId,
        {
          productId: productId,
          projectId: projectId,
          state: 1,
        },
        {
          headers: { Authorization: `Bearer ${currentToken}` },
        }
      );

      return res;
    } catch (err) {
      return err;
    }
  },
  updateInfoProduct: async (value: any, productId: string) => {
    try {
      const currentToken = localStorage.getItem("token");

      const res: any = await axiosClient.patch("/product/" + productId, value, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });

      return res;
    } catch (err) {
      return err;
    }
  },
  deleteProduct: async (productId: string) => {
    try {
      const currentToken = localStorage.getItem("token");

      const res: any = await axiosClient.delete("/product/" + productId, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });

      return res;
    } catch (err) {
      return err;
    }
  },
  getAllProductApproved: async() => {
    try {
        const currentToken = localStorage.getItem("token");

        const res: any = await axiosClient.get(
            '/product/all',
            {
                headers: { Authorization: `Bearer ${currentToken}` },
                params: {
                    state: 1,
                }
            }
        );

        return res;
    } catch(err) {
        return err;
    }
  }
};

export default ProductServices;
