import React from "react";
import { Table, Col, Row } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FormOutlined } from "@ant-design/icons";
import "../../common.scss"
import CreateAccountForm from "./CreateAccountForm";

interface UserInfo {
  key: string;
  fullName: string;
  walletAddress: string;
  phoneNumber: string;
  role: number;
  address: string;
  email: string;
  department?: number;
}

const columns: ColumnsType<UserInfo> = [
  {
    title: "Full Name",
    width: 100,
    dataIndex: "fullName",
    key: "fullName",
    fixed: "left",
  },
  {
    title: "Wallet Adress",
    width: 100,
    dataIndex: "walletAddress",
    key: "walletAddress",
    fixed: "left",
  },
  {
    title: "Phone Number",
    width: 100,
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    fixed: "left",
  },
  {
    title: "Role",
    width: 100,
    dataIndex: "role",
    key: "role",
    fixed: "left",
  },
  {
    title: "Address",
    width: 100,
    dataIndex: "address",
    key: "address",
    fixed: "left",
  },
  {
    title: "Email",
    width: 100,
    dataIndex: "email",
    key: "email",
    fixed: "left",
  },
  {
    title: "Edit",
    key: "operation",
    fixed: "right",
    width: 100,
    render: () => (
      <a>
        <FormOutlined />
      </a>
    ),
  },
];

const data: UserInfo[] = [
  {
    key: "1",
    fullName: "Test AAA",
    walletAddress: "2",
    phoneNumber: "0939865452",
    address: "test",
    role: 2,
    email: "test@gmail.com",
    department: 0,
  },
  {
    key: "2",
    fullName: "Test AAA",
    walletAddress: "2",
    phoneNumber: "0939865452",
    address: "test",
    role: 2,
    email: "test@gmail.com",
    department: 0,
  },
];

export const AccountManagement = () => {
  return (
    <div>
      <Col>
        <div className="header-content">Account Management</div>
        <div className="action-button">
          <CreateAccountForm></CreateAccountForm>
        </div>
        <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />
      </Col>
    </div>
  );
};
