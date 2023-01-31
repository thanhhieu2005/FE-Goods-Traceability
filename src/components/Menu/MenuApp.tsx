import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import "./MenuApp.scss";
import { useSelector } from "react-redux";
import { AppstoreOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
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

  // const items: ItemType[] = listMenuByRole(userName.role);

  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e.key);
    navigate(e.key);
  };

  var items: MenuProps['items'] = [];

  if (userName.role == 1) {
    items = [
      getItem('Management', 'sub1', <AppstoreOutlined/>, [
        getItem('Account', '/techAd-account-management', ),
        getItem('Farm', '/farm-management', ),
      ]),
    ]
  } else if (userName.role == 2) {
    items = [
      getItem('Management', 'sub1', <AppstoreOutlined/>, [
        getItem('Batch/ Project', '/techAd-account-management',),
        getItem('Staff', '/farm-management'),
      ]),
    ]
  }

  return (
    <Menu
      onClick={onClick}
      // style={{ width: 256 }}
      // defaultSelectedKeys={['/techAd-account-management']}
      // defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    ></Menu>
  );
};

