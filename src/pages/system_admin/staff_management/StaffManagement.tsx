import StaffServices from "@/api/system_admin/staff_service";
import { TagDepartmentUser } from "@/components/Tag/StateTag";
import { ListUserInfo, StaffDepartment, parseListUserInfo } from "@/types/user";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row, Table } from "antd";
import Search from "antd/lib/input/Search";
import { ColumnsType } from "antd/lib/table";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const columns: ColumnsType<ListUserInfo> = [
  {
    title: "User ID",
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
    align: "center",
  },
  {
    title: "Full Name",
    width: 100,
    dataIndex: "fullName",
    key: "fullName",
    fixed: "left",
    align: "center",
  },
  {
    title: "Wallet Adress",
    width: 120,
    dataIndex: "walletAddress",
    key: "walletAddress",
    fixed: "left",
    align: "center",
  },
  {
    title: "Phone Number",
    width: 100,
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    fixed: "left",
    align: "center",
  },
  {
    title: "Department",
    width: 100,
    dataIndex: "department",
    key: "department",
    fixed: "left",
    align: "center",
    render: (value: StaffDepartment) => TagDepartmentUser(value),
  },
  {
    title: "Address",
    width: 100,
    dataIndex: "address",
    key: "address",
    fixed: "left",
    align: "center",
  },
];

const StaffManagement = () => {
  const navigate = useNavigate();

  const [dataUsers, setDataUsers] = useState<ListUserInfo[]>([]);

  useEffect(() => {
    StaffServices.getAllDepartmentUser().then((res: any) => {
      if (res?.status === 200) {
        console.log(res);
        res.data.map((element: any) => {
          const user = parseListUserInfo(element) as ListUserInfo;
          console.log(user);
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
            <div className="title-header">Staff Management</div>
            <div className="sub-title-header">
              Manage and edit employees in the enterprise system
            </div>
          </Col>
        </div>
        <div className="content-page">
          <Row
            style={{
              paddingBottom: "12px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Row style={{ width: "80%" }}>
              <div className="label-search">Find Staff</div>
              <div className="search-item">
                <Search placeholder="Enter email staff" enterButton></Search>
              </div>
            </Row>
            <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => navigate(`/create-new-staff`)}
            >
              New Staff
            </Button>
          </Row>
          <Table
            columns={columns}
            dataSource={dataUsers}
            scroll={{ x: 1300 }}
            pagination={{ defaultPageSize: 10, showSizeChanger: true }}
            onRow={(user: ListUserInfo, rowIndex: any) => {
              return {
                onClick: () => {
                  navigate(`/staff-management/${user.key}`, {
                    state: user.key,
                  });
                },
              };
            }}
          />
        </div>
      </Col>
    </div>
  );
};

export default StaffManagement;
