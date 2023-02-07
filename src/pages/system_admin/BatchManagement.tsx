import React from "react";
import { Badge, Button, Col, Row, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FormOutlined, PlusOutlined } from "@ant-design/icons";
import "../common.scss";
import { useNavigate } from "react-router-dom";

interface BatchInfo {
  key: string;
  projectCode: string;
  projectName: string;
  manager: string;
  dateCreated: string;
  status: number;
}


const data: BatchInfo[] = [
  {
    key: "abc123",
    projectCode: "project123",
    projectName: "test project",
    manager: "Tran Quoc Khanh",
    dateCreated: "14/2/2023",
    status: 1,
  },
];

export const BatchManagement = () => {
  const navigate = useNavigate();

  const columns: ColumnsType<BatchInfo> = [
    {
      title: "Batch Identify Address",
      width: 100,
      dataIndex: "key",
      key: "projectId",
      fixed: "left",
    },
    {
      title: "Batch Code",
      width: 100,
      dataIndex: "projectCode",
      key: "projectCode",
      fixed: "left",
    },
    {
      title: "Batch Name",
      width: 100,
      dataIndex: "projectName",
      key: "projectName",
      fixed: "left",
    },
    {
      title: "Manager",
      width: 100,
      dataIndex: "manager",
      key: "manager",
      fixed: "left",
    },
    {
      title: "Date Created",
      width: 100,
      dataIndex: "dateCreated",
      key: "dateCreated",
      fixed: "left",
    },
    {
      title: "Status",
      width: 100,
      dataIndex: "status",
      key: "status",
      fixed: "left",
      render: (value: number) =>
        value == 1 ? (
          <span>
            <Badge
              status="processing"
              color="yellow"
              style={{ paddingRight: "4px" }}
            />
            Pending
          </span>
        ) : value == 2 ? (
          <span>
            <Badge status="success" style={{ paddingRight: "4px" }} />
            Completed
          </span>
        ) : (
          <span>
            <Badge status="error" style={{ paddingRight: "4px" }} />
            Canceled
          </span>
        ),
    },
    {
      title: "Edit",
      key: "operation",
      fixed: "right",
      width: 100,
      render: () => (
        <div
          onClick={() => {
            navigate("/batch-management/id");
          }}
        >
          <FormOutlined />
        </div>
      ),
    },
  ];
  


  return (
    <div>
      <Col>
        <div className="header-content">Batch Management</div>
        <div className="action-button">
          <Button type="primary" icon={<PlusOutlined />}>
            Create New
          </Button>
        </div>
        <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />
      </Col>
    </div>
  );
};
