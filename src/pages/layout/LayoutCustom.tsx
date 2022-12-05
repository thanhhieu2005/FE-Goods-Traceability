import React from "react";
import { Layout } from "antd";
import { HeaderCustom } from "@/components/Header/Header";
import { MenuApp } from "@/components/Menu/MenuApp";
import { Outlet } from "react-router-dom";

import "./LayoutCustom.scss";

const { Sider } = Layout;

export const LayoutCustom = () => {
  return (
    <Layout className="my-layout">
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
        <MenuApp />
      </Sider>
      <Layout>
        <HeaderCustom />
        <Outlet />
      </Layout>
    </Layout>
    // <Content style={{ padding: "0 24px", minHeight: 280 }}>Home</Content>
  );
};
