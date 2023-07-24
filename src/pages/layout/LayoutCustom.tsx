import { HeaderCustom } from "@/components/Header/Header";
import { MenuApp } from "@/components/Menu/MenuApp";
import { Col, Layout, Row, notification } from "antd";
import { Outlet } from "react-router-dom";

import "./LayoutCustom.scss";
import { useEffect, useState } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import { useSelector } from "react-redux";
import { BellOutlined } from "@ant-design/icons";

const { Sider, Content } = Layout;

export const LayoutCustom = () => {
  const [collapsed, setCollapsed] = useState(false);

  const user = useSelector((state: any) => state.authen.currentUserInfo);

  useEffect(() => {
    if (user._id !== null || user._id !== undefined) {
      const messaging = getMessaging();
      onMessage(messaging, (payload) => {
        console.log("Message received. ", payload);
        notification.open({
          message: (
            <Row>
              <BellOutlined style={{ color: "#e8b26e", fontSize: "32px" }} />
              <p>
                {payload.notification !== undefined
                  ? payload.notification.title
                  : "New Notification"}{" "}
              </p>
            </Row>
          ),
          description:
            payload.notification !== undefined
              ? `${payload.notification?.body}`
              : "Test",
          placement: "bottomLeft",
          duration: 5,
        });
      });
    }
  }, [user]);

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
          left: 0,
          top: 0,
          bottom: 0,
          marginTop: "64px",
        }}
      >
        <MenuApp />
      </Sider>
      <Layout className="site-layout" style={{ padding: 24, minHeight: 360 }}>
        <Content style={{ margin: "64px 16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
