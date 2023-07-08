import { axiosClient } from "../services/axios";

const UserServices = {
  RefreshUserAPI: async () => {
    try {
      const currentToken = localStorage.getItem("token");

      const res = await axiosClient.get("/users/me", {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  getUserById: async (userId: string) => {
    try {
      const currentToken = localStorage.getItem("token");

      const res = await axiosClient.get("/user/" + userId, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });

      return res;
    } catch (err) {
      return err;
    }
  },
  updateProfile: async (userId: string, value: any) => {
    try {
      const currentToken = localStorage.getItem("token");

      const res = await axiosClient.patch("/users/" + userId, value, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });

      return res;
    } catch (err) {
      return err;
    }
  },
  changePassword: async (
    email: string,
    currentPassword: string,
    newPassword: string
  ) => {
    try {
      const currentToken = localStorage.getItem("token");

      const res = await axiosClient.post(
        "/users/change-password",
        {
          email: email,
          password: currentPassword,
          newPassword: newPassword,
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
  getCurrentMode: async () => {
    try {
      const currentToken = localStorage.getItem("token");

      const res = await axiosClient.get("/setting/blockchain-mode", {
        headers: { Authorization: `Bearer ${currentToken}` },
      });

      return res;
    } catch (err) {
      return err;
    }
  },
};

export default UserServices;
