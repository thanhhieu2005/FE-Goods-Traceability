import React from "react";
import { Menu } from "antd";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { useNavigate } from "react-router-dom";
import "./MenuApp.scss";
import { listMenuByRole } from "@/utils/checkRole";
import { useSelector } from "react-redux";

export const MenuApp = () => {
  const userName = useSelector((state: any) => state.authen.currentUserInfo);

  const items: ItemType[] = listMenuByRole(userName.role);

  const navigate = useNavigate();
  return (
    <Menu
      className="my-menu"
      defaultSelectedKeys={["/techAd-account-management"]}
      style={{
        background: "transparent",
        marginTop: "30px",
      }}
      theme="dark"
      mode="inline"
      items={items}
      onClick={({ key }) => {
        navigate(key);
      }}
    ></Menu>
  );
};
