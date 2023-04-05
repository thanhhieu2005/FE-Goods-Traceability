import React, { useState } from "react";
import { Layout } from "antd";
import { HeaderCustom } from "@/components/Header/Header";
import { MenuApp } from "@/components/Menu/MenuApp";
import { Outlet } from "react-router-dom";

import "./LayoutCustom.scss";

const { Sider } = Layout;

export const LayoutCustom = () => {
  return (
    <Layout className="my-layout">
      <HeaderCustom />
      <Layout hasSider>
        <Sider
          width={300}
          theme = 'light'
          breakpoint="lg"
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            marginTop: '64px'
          }}
        >
          {/* <div className="logo" /> */}
          <MenuApp/>
        </Sider>
        <Layout className="site-layout" 
          style={{ 
            padding: '48px 24px 24px', 
            minHeight: '100vh', 
            marginTop: "40px", 
            marginLeft: "300px"
          }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};
