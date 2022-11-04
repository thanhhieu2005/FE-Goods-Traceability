import { useNavigate } from 'react-router-dom';
import Routers from './routers';
import 'antd/dist/antd.min.css';
import { axiosClient } from './services/axios';
import { useDispatch } from 'react-redux';
import { updateCurrentUserInfo } from './redux/authenSlice';
import { useEffect } from 'react';
import React from 'react';

function App() {
  const currentToken = localStorage.getItem('token');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentToken) {
      const getUser = async () => {
        const refreshUserInfo = await axiosClient.get('/users/me', {
          headers: { Authorization: `Bearer ${currentToken}` },
        });

        console.log(refreshUserInfo.data);

        dispatch(updateCurrentUserInfo(refreshUserInfo.data));
      };
      getUser();
    }
  }, [currentToken, dispatch, navigate]);

  return <Routers />;
}

export default App;
