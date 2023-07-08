import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  DashboardOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { UserRole } from "@/types/user";

import { TbHomeEco, TbColumns3 } from "react-icons/tb";
import { FaTasks } from "react-icons/fa";
import { RiSeedlingLine } from "react-icons/ri";
import { TfiViewListAlt } from "react-icons/tfi";

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
    } else if (userName.role === UserRole.SystemAdmin) {
      if (location.pathname.includes("/")) {
        setPath("/project-management");
      }
      if (location.pathname.includes("/staff-management"))
        setPath("/staff-management");
      if (location.pathname.includes("/dashboard")) setPath("/dashboard");
      // if (location.pathname.includes("/settings")) {
      //   setPath("/settings");
      // }
    } else if (userName.role === UserRole.Farmer && userName.isOwner === true) {
      if (location.pathname.includes("/")) {
        setPath("/farm-info");
      }
      if (location.pathname.includes("/farm-project-management")) {
        setPath("/farm-project-management");
      } else if (location.pathname.includes("/land-management")) {
        setPath("/land-management");
      } else if (location.pathname.includes("/seed-management")) {
        setPath("/seed-management");
      }
    } else if (userName.role === UserRole.Staff && userName.department === 2) {
      if (location.pathname.includes("/")) {
        setPath("/harvest-management");
      } 
    } else if (userName.role === UserRole.Staff && userName.department === 3) {
      if (location.pathname.includes("/")) {
        setPath("/transport-management");
      } 
    } else if (userName.role === UserRole.Staff && userName.department === 4) {
      if (location.pathname.includes("/")) {
        setPath("/warehouse-management");
      }
    } else if (userName.role === UserRole.Staff && userName.department === 5) {
      if (location.pathname.includes("/")) {
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
      getItem("Dashboard", "/dashboard", <DashboardOutlined />),
      getItem(
        "Batch/ Project Management",
        "/project-management",
        <TfiViewListAlt />
      ),
      getItem("Staff Management", "/staff-management", <TeamOutlined />),
      // getItem("Settings", "/settings", <SettingOutlined />),
    ];
  } else if (userName.role == UserRole.Farmer) {
    if (userName.isOwner === true) {
      items = [
        getItem("Farm Information", "/farm-info", <TbHomeEco />),
        getItem(
          "Farm Project Management",
          "/farm-project-management",
          <FaTasks />
        ),
        getItem("Land Management", "/land-management", <TbColumns3 />),
        getItem("Seed Management", "/seed-management", <RiSeedlingLine />),
        // getItem("Settings", "/settings", <SettingOutlined />),
      ];
    } else {
      items = [
        getItem("Farm Information", "/farm-info", <TbHomeEco />),
        // getItem("Settings", "/settings", <SettingOutlined />),
      ];
    }
  } else if (userName.role === UserRole.Staff && userName.department === 2) {
    items = [
      getItem("Harvest Management", "/harvest-management"),
      // getItem("Settings", "/settings", <SettingOutlined />),
    ];
  } else if (userName.role === UserRole.Staff && userName.department === 3) {
    items = [
      getItem("Transport Management", "/transport-management"),
      // getItem("Settings", "/settings", <SettingOutlined />),
    ];
  } else if (userName.role == UserRole.Staff && userName.department === 4) {
    items = [
      getItem("Warehouse Management", "/warehouse-management"),
      // getItem("Settings", "/settings", <SettingOutlined />),
    ];
  } else if (userName.role == UserRole.Staff && userName.department === 5) {
    items = [
      getItem("Pruduction Management", "/produce-management"),
      // getItem("Settings", "/settings", <SettingOutlined />),
    ];
  }

  // Common pages in app
  // items.push(getItem("Test", "/test"));

  return (
    <Menu
      onClick={onClick}
      // style={{ width: 256 }}
      // defaultOpenKeys={["sub1"]}
      selectedKeys={[path]}
      mode="inline"
      items={items}
      style={{ height: "100vh" }}
      theme="light"
    ></Menu>
  );
};
