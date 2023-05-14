import { Layout, Avatar, Dropdown, Menu, Row, Col } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import type { MenuProps } from "antd";
import React, { useCallback, useEffect } from "react";
import { ItemType, MenuInfo } from "rc-menu/lib/interface";
import "./Header.scss";
import { logout } from "@/redux/authenSlice";
import { useNavigate } from "react-router-dom";
import { checkRole } from "@/utils/checkRole";
import { connect } from "../../features/connectWalletAPI";
import logo from "../../assets/images/img-logo.png";
import { useAppDispatch } from "@/redux/hook";

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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const role = checkRole(userName.role);

  const fetch = useCallback(() => {
    dispatch(connect());
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  // useEffect(() => {

  //   if (log == null) {
  //     setLogged(false);
  //   } else setLogged(true);
  // }, [log]);

  const onLogout = async () => {
    localStorage.clear();

    dispatch(logout());

    navigate("/login", { replace: true });
  };

  const onBackHomePage = () => {
    navigate(`/`);
  }

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
        minHeight: '64px',
        padding: "0",
        marginBottom: "100px",
        position: "fixed",
        left: "0",
        top: "0",
        right: "0",
        zIndex: "1000",
        backgroundColor: '#111d2c',
      }}
    >
      <Row
        style={{
          justifyContent: "space-between",
        }}
      >
        <div>
          <Row style={{ display: "flex", alignItems: "center" }} onClick={onBackHomePage}>
            <img style={{ width: "48px", margin: "0 12px", cursor: 'pointer'}} src={logo} />
            <div className="app-name">HK Solution</div>
          </Row>
        </div>
        <div
          style={{
            marginRight: "16px",
            gap: 12,
          }}
        >
          <span className="item-header item-role"> {role} </span>
          <span className="item-header">Hi, {userName.firstName}</span>
          <Dropdown overlay={menu} placement="bottomRight">
            <Avatar size="large" icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </Row>
    </Header>
  );
};
