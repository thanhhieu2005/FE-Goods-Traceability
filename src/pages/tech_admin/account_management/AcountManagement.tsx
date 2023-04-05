import React, { useEffect, useState } from "react";
import { Table, Col, Row } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FormOutlined } from "@ant-design/icons";
import "../../common.scss"
import CreateAccountForm from "./CreateAccountForm";
import { useNavigate } from "react-router-dom";
import UserManagementService from "@/api/admin_tech/user_management_service";
import { ListUserInfo, parseListUserInfo } from "@/types/user";
import { TagRoleUser } from "@/components/Tag/StateTag";
import Search from "antd/lib/input/Search";


const columns: ColumnsType<ListUserInfo> = [
  {
    title: "User Id",
    width: 120,
    dataIndex: "userId",
    key: "userId",
    fixed: "left",
    align: "center",
  },
  {
    title: "Email",
    width: 120,
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
    width: 120,
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
    render: (value: number) => TagRoleUser(value),
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
        console.log("a", res.data);
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
        <div className="header-content">
          <Col>
            <div className="title-header">
              Account Management
            </div>
            <div className="sub-title-header">
              Display the list of user accounts in the system
            </div>     
          </Col>
        </div>
        <div className="content-page">
          <Col>
            <Row style={{paddingBottom: '12px', justifyContent: 'space-between'}}>
              <Row style={{width:'80%'}}>
                <div className="label-search">
                  Find account
                </div>
                <div className="search-item">
                  <Search placeholder="Enter your email" enterButton/>
                </div>
              </Row>
              <div className="action-layout-btn">
                <CreateAccountForm></CreateAccountForm>
              </div>
            </Row>
            <Table 
              columns={columns} 
              dataSource={dataUsers} 
              scroll={{ x: 1300 }}
              onRow={(user, rowIndex) => {
                return {
                  onClick: () => {
                    navigate(`/techAd-account-management/${user.key}`, {
                      state: user.key,
                    })
                  }
                };
              }} 
            />
          </Col>
        </div>
      </Col>
    </div>
  );
};
