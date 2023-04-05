import { useNavigate } from 'react-router-dom';
import Routers from './routers';
import 'antd/dist/antd.min.css';
import { axiosClient } from './services/axios';
import { useDispatch } from 'react-redux';
import { logout, updateCurrentUserInfo } from './redux/authenSlice';
import { useEffect } from 'react';
import { AxiosError } from 'axios';


function App() {
  const currentToken = localStorage.getItem('token');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "HK Solution"
    if (currentToken) {
      const getUser = async () => {
        try {
          const refreshUserInfo = await axiosClient.get('/users/me', {
            headers: { Authorization: `Bearer ${currentToken}` },
          });
  
          dispatch(updateCurrentUserInfo(refreshUserInfo.data));
        } catch (err) {
          localStorage.clear();
          
          dispatch(logout);
          
          navigate("/login", { replace: true });
        }
      };
      getUser();
    }
  }, [currentToken, dispatch, navigate]);

  return <Routers />;
}

export default App;
