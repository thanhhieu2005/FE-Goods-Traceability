import { axiosClient } from "@/services/axios";

const ProductServices = {
    getDetailProduct: async(projectId: string) => {
        try {
            const currentToken = localStorage.getItem('token');

            const res: any = await axiosClient.get(
                "/product/all-by-project",
                {
                    headers: { Authorization: `Bearer ${currentToken}`},
                    params: {
                        projectId: projectId,
                    }
                }
            );

            return res; 
        } catch (err) {
            return err;
        }
    }
}

export default ProductServices;