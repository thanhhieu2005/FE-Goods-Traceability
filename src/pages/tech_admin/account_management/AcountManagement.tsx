import React, { useEffect, useState } from "react";
import { Table, Col } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FormOutlined } from "@ant-design/icons";
import "../../common.scss"
import CreateAccountForm from "./CreateAccountForm";
import { useNavigate } from "react-router-dom";
import UserManagementService from "@/api/admin_tech/user_management_service";
import { ListUserInfo } from "@/types/user";
import { parseListUserInfo } from "@/utils/parseData";


const columns: ColumnsType<ListUserInfo> = [
  {
    title: "Email",
    width: 100,
    dataIndex: "email",
    key: "email",
    fixed: "left",
    align: 'center',
  },
  {
    title: "Full Name",
    width: 100,
    dataIndex: "fullName",
    key: "fullName",
    fixed: "left",
    align: 'center',
  },
  {
    title: "Wallet Adress",
    width: 100,
    dataIndex: "walletAddress",
    key: "walletAddress",
    fixed: "left",
    align: 'center',
  },
  {
    title: "Phone Number",
    width: 100,
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    fixed: "left",
    align: 'center',
  },
  {
    title: "Role",
    width: 100,
    dataIndex: "role",
    key: "role",
    fixed: "left",
    align: 'center',
  },
  {
    title: "Address",
    width: 100,
    dataIndex: "address",
    key: "address",
    fixed: "left",
    align: 'center',
  },
  // {
  //   title: "Edit",
  //   key: "operation",
  //   fixed: "right",
  //   width: 100,
  //   render: () => (
  //     <a>
  //       <FormOutlined />
  //     </a>
  //   ),
  // },
];

export const AccountManagement = () => {
  const navigate = useNavigate();

  const [dataUsers, setDataUsers] = useState<ListUserInfo[]>([]);

  useEffect(() => {
      UserManagementService.getAllUserService().then((res : any) => {
      if(res?.status === 200) {
        res.data.map((element : any) => {
          const user = parseListUserInfo(element) as ListUserInfo;
          setDataUsers((prevUser) => [...prevUser, user]);
        });
      }
    });
  }, []);

  return (
    <div>
      <Col>
        <div className="header-content">Account Management</div>
        <div className="action-button">
          <CreateAccountForm></CreateAccountForm>
        </div>
        <Table columns={columns} dataSource={dataUsers} scroll={{ x: 1300 }} />
      </Col>
    </div>
  );
};
