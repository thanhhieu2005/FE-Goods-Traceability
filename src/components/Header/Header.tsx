import { icLogo, logoBlockchain } from "@/assets";
import { logout } from "@/redux/authenSlice";
import { useAppDispatch } from "@/redux/hook";
import { backgroundColor } from "@/utils/app_color";
import { checkRole } from "@/utils/checkRole";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Col, Dropdown, Layout, Row, message } from "antd";
import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { connect } from "../../features/connectWalletAPI";
import "./Header.scss";
import { clearBlockchainMode } from "@/redux/modeSlide";

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


export const HeaderCustom: React.FC = () => {
  const userName = useSelector((state: any) => state.authen.currentUserInfo);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const role = checkRole(userName.role, userName.department);

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
    dispatch(clearBlockchainMode());

    navigate("/login", { replace: true });
  };

  const onBackHomePage = () => {
    navigate(`/`);
  };

  const onClickItems: MenuProps['onClick'] = e => {
    if(e.key === '2') {
      onLogout();
    } else if(e.key === "1") {
      // message.info("Feature is delevoping!");
      navigate('/user-profile');
    }
  }

  const items: MenuProps["items"] = [
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

  return (
    <Header
      className="site-layout-sub-header-background"
      style={{
        minHeight: "64px",
        padding: "0",
        marginBottom: "100px",
        position: "fixed",
        left: "0",
        top: "0",
        right: "0",
        zIndex: "1000",
        backgroundColor: backgroundColor,
      }}
    >
      <Row
        style={{
          justifyContent: "space-between",
        }}
      >
        <div>
          <Row
            style={{ display: "flex", alignItems: "center" }}
            onClick={onBackHomePage}
          >
            <img
              style={{ width: "48px", margin: "0 12px", cursor: "pointer" }}
              src={logoBlockchain}
            />
            <div className="app-name">HK Solution</div>
          </Row>
        </div>
        <div
          style={{
            marginRight: "16px",
            gap: 12,
          }}
        >
          <span className="item-header item-role" style={{ color: "#e8b26e"}}> {role} </span>
          <span className="item-header" style={{ color: "#e8b26e"}}>Hi, {userName.firstName}</span>
          <Dropdown 
            menu={{
              items,
              onClick: onClickItems,
            }} 
            placement="bottomRight"
          >
            <Avatar size="large" icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </Row>
    </Header>
  );
};
