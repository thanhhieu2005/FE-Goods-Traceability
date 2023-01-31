import React from "react";
import { Badge, Col, Row, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FormOutlined } from "@ant-design/icons";
import "../common.scss";
import CreateFarmForm from "./CreateFarmForm";

interface FarmInfo {
  key: string;
  farmCode: string;
  farmName: string;
  farmAddress?: string;
  farmPhoneNumber?: string;
  farmOwner?: string;
  statusFarm: number;
}

const columns: ColumnsType<FarmInfo> = [
  {
    title: "ID",
    width: 100,
    dataIndex: "key",
    key: "farmId",
    fixed: "left",
  },
  {
    title: "Code",
    width: 100,
    dataIndex: "farmCode",
    key: "farmCode",
    fixed: "left",
  },
  {
    title: "Name",
    width: 100,
    dataIndex: "farmName",
    key: "farmName",
    fixed: "left",
  },
  {
    title: "Owner",
    width: 100,
    dataIndex: "farmOwner",
    key: "owner",
    fixed: "left",
  },
  {
    title: "Address",
    width: 100,
    dataIndex: "farmAddress",
    key: "farmAddress",
    fixed: "left",
  },
  {
    title: "Phone Number",
    width: 100,
    dataIndex: "farmPhoneNumber",
    key: "phoneNumber",
    fixed: "left",
  },
  {
    title: "Status",
    width: 100,
    dataIndex: "statusFarm",
    key: "state",
    fixed: "left",
    render: (value: number) =>
      value == 1 ? (
        <span>
          <Badge status="success" style={{paddingRight: '4px'}} />
          Actived
        </span>
      ) : value == 2 ? (
        <span>
          <Badge status="processing" style={{paddingRight: '4px'}} />
          Not Actived
        </span>
      ) : (
        <span>
          <Badge status="error" style={{paddingRight: '4px'}} />
          Revoked
        </span>
      ),
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

const data: FarmInfo[] = [
  {
    key: "123",
    farmCode: "1AFarm",
    farmName: "Test Nông trại",
    farmOwner: "Nguyễn Văn A",
    farmAddress: "123ABC",
    farmPhoneNumber: "1234567890",
    statusFarm: 1,
  },
];

export const TechAdminFarm = () => {
  return (
    <div>
      <Col>
        <div className="header-content">Account Management</div>
        <div className="action-button">
          <CreateFarmForm></CreateFarmForm>
        </div>
        <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />
      </Col>
    </div>
  );
};
