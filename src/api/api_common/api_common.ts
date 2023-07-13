import { axiosClient } from "@/services/axios";

const ApiCommonService = {
  resetPassword: async (email: string) => {
    try {
      // const currentToken = localStorage.getItem("token");
      const res = await axiosClient.get("/users/reset-password", {
        // headers: { Authorization: `Bearer ${currentToken}` },
        params: {
          email: email,
        },
      });
      return res;
    } catch (error) {
      return error;
    }
  },
  confirmOTP: async (otpId: string, otpCode: string) => {
    try {
      const res = await axiosClient.get("/users/confirm-otp", {
        params: {
          otpId: otpId,
          otpCode: otpCode,
        },
      });
      return res;
    } catch (err) {
      return err;
    }
  },
  updateNewPassword: async (email: string, newPassword: string) => {
    try {
      const res = await axiosClient.patch(
        "/users/update-user",
        {
          password: newPassword,
        },
        {
          params: {
            email: email,
          },
        }
      );
      return res;
    } catch (err) {
      return err;
    }
  },
  uploadImage: async (formData: any) => {
    try {
      const currentToken = localStorage.getItem("token");
      const res = await axiosClient.post("/image/upload", formData, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
          "content-type": "multipart/form-data",
        },
      });

      return res;
    } catch (err) {
      return err;
    }
  },
  deleteImage: async (url: string) => {
    try {
      const currentToken = localStorage.getItem("token");

      console.log("url", url);

      const res: any = await axiosClient.delete("/image/", {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
        params: {
          url: url.replace("https", "http"),
        },
      });

      return res;
    } catch (err) {
      return err;
    }
  },
};

export default ApiCommonService;
