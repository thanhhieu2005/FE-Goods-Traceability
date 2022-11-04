import React, { useEffect } from 'react'
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import './Home.scss'
import { logout } from '../../redux/authenSlice';

const { Header, Content, Sider } = Layout;

export const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const currentToken = localStorage.getItem('token');

    if(!currentToken) {
      navigate('/login', {replace: true});
    }
  }, [navigate]);

  const logoutUser = async () => {
    // await axiosClient.post(
    //   "/users/logout" );

    localStorage.clear();

    dispatch(logout());

    navigate('/login');

  }

  return (
    <Layout className= 'my-layout'>
    <Sider
      width={240}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="logo" />
      <Menu
        className='my-menu'
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['4']}
        items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
          (icon, index) => ({
            key: String(index + 1),
            icon: React.createElement(icon),
            label: `nav ${index + 1}`,
          }),
        )}
      >
      </Menu>
      <div 
          style={{
            padding: 20,
            bottom: 0,
            alignItems: 'flex-end'
          }}
        >
          LogOut
        </div>
    </Sider>
    <Layout>
      <Header
        className="site-layout-sub-header-background"
        style={{
          padding: 0,
          background: '#3D8361',
        }}
      />
      <Content
        style={{
          margin: '24px 16px 0',
        }}
      >
        <div
          className="site-layout-background"
          style={{
            padding: 24,
            // minHeight: 360,
          }}
        >
          content
        </div>
      </Content>
      {/* <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©2018 Created by Ant UED
      </Footer> */}
    </Layout>
  </Layout>
  )
}
