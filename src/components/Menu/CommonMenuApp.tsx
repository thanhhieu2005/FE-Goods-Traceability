import { blackColor, mainColor } from "@/utils/app_color";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

const CommonMenuApp = () => {
  const navigate = useNavigate();

  const [path, setPath] = useState("");

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  var items: MenuProps["items"] = [
    getItem("About us", "/about-us", <ExclamationCircleOutlined />),
  ];

  const location = useLocation();

  if(location.pathname.includes("/about-us")) {
    setPath('/about-us')
  }

  return (
    <>
      <Menu
        onClick={onClick}
        // style={{ width: 256 }}
        // defaultOpenKeys={["sub1"]}
        selectedKeys={[path]}
        mode="inline"
        items={items}
        // theme="dark"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
            marginBottom: '2px',
          padding: "4px",
          // backgroundColor: "rgba(0, 0, 0, 1)",
          // color: mainColor,
        }}
      ></Menu>
    </>
  );
};

export default CommonMenuApp;
