import { notification } from "antd";
import "antd/dist/antd.min.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NotificationServices from "./api/api_common/notification_common";
import UserServices from "./api/user_api";
import { logout, updateCurrentUserInfo } from "./redux/authenSlice";
import { updateBlockchainMode } from "./redux/modeSlide";
import Routers from "./routers";
import { axiosClient } from "./services/axios";
import { getMessagingToken, onMessageListener } from "./services/firebase";

function App() {
  const currentToken = localStorage.getItem("token");

  const tokenFCM = localStorage.getItem("registrationTokenFCM");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "HK Solution";
    if (currentToken) {
      const getUser = async () => {
        try {
          const refreshUserInfo = await axiosClient.get("/users/me", {
            headers: { Authorization: `Bearer ${currentToken}` },
          });

          if (refreshUserInfo.status === 200) {
            const currentMode: any = await UserServices.getCurrentMode();

            dispatch(updateBlockchainMode(currentMode.data.result));

            dispatch(updateCurrentUserInfo(refreshUserInfo.data));
          } else {
            localStorage.clear();

            dispatch(logout);

            navigate("/login", { replace: true });
          }
        } catch (err) {
          localStorage.clear();

          dispatch(logout);

          navigate("/login", { replace: true });
        }
      };
      getUser();
    }
  }, [currentToken, dispatch, navigate]);

  /// Bắt notification
  const user = useSelector((state: any) => state.authen.currentUserInfo);
  
  useEffect(() => {
    if (tokenFCM) {
      const saveFCMToken = async () => {
        const res: any = await NotificationServices.saveFCMToken(
          tokenFCM,
          user.email
        );

        if (res.status === 200) {
          console.log("success save fcm token");
        }
      };

      saveFCMToken();
      getMessagingToken();

      // onMessageListener()
      //   .then((payload) => {
      //     console.log(payload);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      // const channel = new BroadcastChannel("notifications");
      // channel.addEventListener("message", (event: any) => {
      //   console.log("Receive background: ", event.data);
      //   notification.info({
      //     message: "New Notification",
      //     description: `${event.data?.notfication.title}`,
      //   });
      // });
    }
  }, [tokenFCM, user.email]);

  // useEffect(() => {
  //   onMessageListener().then((data: any) => {
  //     console.log("Receive foreground: ", data);
  //     notification.info({
  //       message: 'New Notification',
  //       description: `${data?.notfication.title}`
  //     });
  //   });
  // });

  return <Routers />;
}

export default App;
