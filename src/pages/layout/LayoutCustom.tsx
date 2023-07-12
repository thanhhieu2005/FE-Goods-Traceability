import { HeaderCustom } from "@/components/Header/Header";
import { MenuApp } from "@/components/Menu/MenuApp";
import { Col, Layout } from "antd";
import { Outlet } from "react-router-dom";

import "./LayoutCustom.scss";
import { useState } from "react";

const { Sider, Content } = Layout;

export const LayoutCustom = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className="my-layout" style={{ minHeight: "100vh" }}>
      <HeaderCustom />
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={300}
        theme="light"
        breakpoint="lg"
        style={{
          // overflow: "hidden",
          // // height: "100%",
          // position: "fixed",
          // left: 0,
          // top: 0,
          // bottom: 0,
          marginTop: "64px",
        }}
      >
        <MenuApp />
      </Sider>
      <Layout
        className="site-layout"
        style={{ padding: 24, minHeight: 360 }}
      >
        <Content style={{ margin: '64px 16px' }}>
        <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
