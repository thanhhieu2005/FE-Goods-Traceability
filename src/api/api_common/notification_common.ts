import { axiosClient } from "@/services/axios";

const NotificationServices = {
    getNotificationsByUser: async () => {
        try {
            const currentToken = localStorage.getItem("token");
      
            const res = await axiosClient.get(
              '/users/all-notification?page=0',
              {
                headers: { Authorization: `Bearer ${currentToken}` },
              }
            );
            return res;
          } catch (err) {
            return err;
          }
    },
    getNotificationsScrollByUser: async (page: number) => {
      try {
          const currentToken = localStorage.getItem("token");
    
          const res = await axiosClient.get(
            `/users/all-notification?page=${page}`,
            {
              headers: { Authorization: `Bearer ${currentToken}` },
            }
          );
          return res;
        } catch (err) {
          return err;
        }
  },
    saveFCMToken: async (token: string, email: any) => {
        try {
            const currentToken = localStorage.getItem("token");

            const res = await axiosClient.post(
                "/fcm/save-fcm-token",
                {
                    token: token,
                    email: email,
                },
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

export default NotificationServices;