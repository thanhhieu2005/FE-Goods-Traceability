import { useNavigate } from "react-router-dom";
import Routers from "./routers";
import "antd/dist/antd.min.css";
import { axiosClient } from "./services/axios";
import { useDispatch } from "react-redux";
import { logout, updateCurrentUserInfo } from "./redux/authenSlice";
import { useEffect } from "react";
import UserServices from "./api/user_api";
import { updateBlockchainMode } from "./redux/modeSlide";
import firebase from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { getMessagingToken, onMessageListener } from "./services/firebase";

function App() {
  const currentToken = localStorage.getItem("token");

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

  useEffect(()=> {
    getMessagingToken();
    
  }, []);

  return <Routers />;
}

export default App;
