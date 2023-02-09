import React from "react";
import { Badge, Col, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FormOutlined } from "@ant-design/icons";
import "../common.scss";
import { useNavigate } from "react-router-dom";
import CreateProjectForm from "./CreateProjectForm";

interface ProjectInfo {
  key: string;
  projectCode: string;
  projectName: string;
  manager: string;
  dateCreated: string;
  status: number;
}

const data: ProjectInfo[] = [
  {
    key: "abc123",
    projectCode: "project123",
    projectName: "test project",
    manager: "Tran Quoc Khanh",
    dateCreated: "14/2/2023",
    status: 1,
  },
];

export const ProjectManagement = () => {
  const navigate = useNavigate();

  const columns: ColumnsType<ProjectInfo> = [
    {
      title: "Project Identify Address",
      width: 100,
      dataIndex: "key",
      key: "projectId",
      fixed: "left",
    },
    {
      title: "Project Code",
      width: 100,
      dataIndex: "projectCode",
      key: "projectCode",
      fixed: "left",
    },
    {
      title: "Project Name",
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
        <div style={{cursor: "pointer"}}
          onClick={() => {
            navigate("/project-management/id");
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
        <div className="header-content">Project Management</div>
        <div className="action-button">
          <CreateProjectForm />
        </div>
        <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />
      </Col>
    </div>
  );
};
