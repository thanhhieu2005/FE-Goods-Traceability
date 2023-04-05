import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppstoreOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { UserRole } from "@/types/user";

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
    if (userName.role === UserRole.TechnicalAdmin) {
      if (location.pathname.includes("/techAd-account-management")) {
        setPath("/techAd-account-management");
      }
      if (location.pathname.includes("/techAd-farm-management"))
        setPath("/techAd-farm-management");
    } else if(userName.role === UserRole.SystemAdmin) {
      if (location.pathname.includes("/")) {
        setPath("/project-management");
      }
      // if (location.pathname.includes("/farm-management"))
      //   setPath("/farm-management");
    } else if(userName.role === UserRole.Farmer && userName.isOwner === true) {
      if(location.pathname.includes('/')) {
        setPath("/farm-info");
      }
      if ( location.pathname.includes('/farm-project-management')) {
        setPath("/farm-project-management");
      } 
    } else if (userName.role === UserRole.Staff && userName.department === 2) {
      if(location.pathname.includes("/")) {
        setPath("/harvest-management");
      }
    } else if (userName.role === UserRole.Staff && userName.department === 3) {
      if(location.pathname.includes("/")) {
        setPath("/transport-management");
      }
    } else if (userName.role === UserRole.Staff && userName.department === 4) {
      if(location.pathname.includes("/")) {
        setPath("/warehouse-management");
      }
    } else if (userName.role === UserRole.Staff && userName.department === 5) {
      if(location.pathname.includes("/")) {
        setPath("/produce-management");
      }
    }
  }, [location.pathname, userName]);

  const [path, setPath] = useState("/");

  // const items: ItemType[] = listMenuByRole(userName.role);

  const navigate = useNavigate();

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  var items: MenuProps["items"] = [];

  if (userName.role == UserRole.TechnicalAdmin) {
    items = [
      getItem("Account Management", "/techAd-account-management"),
      getItem("Farm Management", "/techAd-farm-management"),
    ];
  } else if (userName.role == UserRole.SystemAdmin) {
    items = [
      getItem("Batch/ Project Management", "/project-management"),
    ];
  } else if(userName.role == UserRole.Farmer && userName.isOwner === true) {
    items = [
      getItem("Farm Information", '/farm-info'),
      getItem("Farm Project Management", '/farm-project-management'),
    ];
  }else if (userName.role === UserRole.Staff && userName.department ===2) {
    items = [
      getItem("Harvest Management", "/harvest-management"),
    ];
  } else if (userName.role === UserRole.Staff && userName.department === 3) {
    items = [
      getItem("Transport Management", "/transport-management"),
    ];
  } else if (userName.role == UserRole.Staff && userName.department === 4) {
    items = [
      getItem("Warehouse Management", "/warehouse-management"),
    ];
  } else if (userName.role == UserRole.Staff && userName.department === 5) {
    items = [
      getItem("Pruduction Management", "/produce-management"),
    ];
  }
  

  return (
    <Menu
      onClick={onClick}
      // style={{ width: 256 }}
      // defaultOpenKeys={["sub1"]}
      selectedKeys={[path]}
      mode="inline"
      items={items}
      style={{minHeight: "100vh"}}
      theme="light"
    ></Menu>
  );
};
