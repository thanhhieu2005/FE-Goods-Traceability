import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "./MenuApp.scss";
import { useSelector } from "react-redux";
import { AppstoreOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export const MenuApp = () => {
  const userName = useSelector((state: any) => state.authen.currentUserInfo);

  const location = useLocation();


  // Kiểm tra role set path phù hợp
  useEffect(() => {
    if (userName.role == 1) {
      if (location.pathname.includes("/techAd-account-management")) {
        setPath("/techAd-account-management");
      }
      if (location.pathname.includes("/farm-management"))
        setPath("/farm-management");
    } else {
      if (location.pathname.includes("/")) {
        setPath("/batch-management");
      }
      if (location.pathname.includes("/farm-management"))
        setPath("/farm-management");
    }
  }, [location.pathname, userName]);

  const [path, setPath] = useState("/");

  // const items: ItemType[] = listMenuByRole(userName.role);

  const navigate = useNavigate();

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  var items: MenuProps["items"] = [];

  if (userName.role == 1) {
    items = [
      getItem("Management", "sub1", <AppstoreOutlined />, [
        getItem("Account", "/techAd-account-management"),
        getItem("Farm", "/farm-management"),
      ]),
    ];
  } else if (userName.role == 2) {
    items = [
      getItem("Management", "sub1", <AppstoreOutlined />, [
        getItem("Batch/ Project", "/batch-management"),
        getItem("Staff", "/farm-management"),
      ]),
    ];
  }

  return (
    <Menu
      onClick={onClick}
      // style={{ width: 256 }}
      selectedKeys={[path]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
    ></Menu>
  );
};
