import { Layout, Avatar, Dropdown, Menu, Row, Col } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import type { MenuProps } from "antd";
import React from "react";
import { ItemType, MenuInfo } from "rc-menu/lib/interface";
import "./Header.scss";
import { logout } from "@/redux/authenSlice";
import { useNavigate } from "react-router-dom";
import { checkRole } from "@/utils/checkRole";

const { Header } = Layout;

interface HeaderListItemProps {
  title: string;
}

const HeaderListItem: React.FC<HeaderListItemProps> = ({ title }) => {
  return (
    <Row justify="start" align="middle">
      <Col>
        <span> {title} </span>
      </Col>
    </Row>
  );
};

const headerlistDropdownItems: ItemType[] = [
  {
    key: "1",
    label: <HeaderListItem title="User Profile" />,
  },
  {
    key: "2",
    itemIcon: <LogoutOutlined />,
    label: <HeaderListItem title="Logout" />,
  },
];

export const HeaderCustom: React.FC = () => {
  const userName = useSelector((state: any) => state.authen.currentUserInfo);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const role = checkRole(userName.role);

  const onLogout = async () => {
    localStorage.clear();

    dispatch(logout());

    navigate("/login", { replace: true });
  };

  const onMenuHeaderClick: MenuProps["onClick"] = (event: MenuInfo) => {
    const { key } = event;

    switch (key) {
      case "1":
        console.log("Chưa phát triển!");
        break;
      case "2":
        onLogout();
        break;
      default:
        break;
    }
  };

  const menu = (
    <Menu
      items={headerlistDropdownItems}
      onClick={onMenuHeaderClick}
      selectedKeys={[]}
    ></Menu>
  );

  return (
    <Header
      className="site-layout-sub-header-background"
      style={{
        padding: 0,
        background: "#1C6758",
        lineHeight: 0,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <div
        style={{
          marginRight: "16px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span className="item-header item-role"> {role} </span>
        <span className="item-header">Hi, {userName.firstName}</span>
        <Dropdown overlay={menu} placement="bottomRight">
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  );
};
