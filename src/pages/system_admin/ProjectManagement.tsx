import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Row, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FormOutlined } from "@ant-design/icons";
import "../common.scss";
import { useNavigate } from "react-router-dom";
import CreateProjectForm from "./CreateProjectForm";
import { GetAllProjectAPI } from "@/api/system_admin/project_api";

interface ProjectInfo {
  key: string;
  projectCode: string;
  projectName: string;
  manager: string;
  dateCreated: string;
  status: number;
}

// const data: ProjectInfo[] = [
//   {
//     key: "123",
//     projectCode: "project123",
//     projectName: "test project",
//     manager: "Tran Quoc Khanh",
//     dateCreated: "14/2/2023",
//     status: 1,
//   },
// ];

export const ProjectManagement = () => {
  const navigate = useNavigate();

  const [dataProjects, setDataProjects] = useState<ProjectInfo[]>([]);

  useEffect(() => {
    const fetchAPI = GetAllProjectAPI();
    fetchAPI.then((res: any) => {
      console.log("res:", res);
      res?.data.map((element: any) => {
        var project = {} as ProjectInfo;
        project.key = element._id;
        project.projectName = element.projectName;
        (project.projectCode = element.projectCode),
          (project.manager =
            element.manager?.lastName + " " + element.manager?.firstName);
        project.dateCreated = element.dateCreated;
        project.status = element.state;
        setDataProjects((prevArr) => [...prevArr, project]);
      });
    });
  }, []);

  console.log(dataProjects);

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
            <Badge status="processing" style={{ paddingRight: "4px" }} />
            Processing
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
    // {
    //   title: "Edit",
    //   key: "operation",
    //   fixed: "right",
    //   width: 100,
    //   render: () => (
    //     <div
    //       style={{ cursor: "pointer" }}
    //       onClick={() => {
    //         console.log(dataTest)
    //         // navigate("/project-management/id");
    //       }}
    //     >
    //       <FormOutlined />
    //     </div>
    //   ),
    // },
  ];

  return (
    <div>
      <Col>
        <div className="header-content">Project Management</div>
        <div className="action-button">
          <Row>
            <CreateProjectForm />
            <Button>Test</Button>
          </Row>
        </div>
        <Table
          columns={columns}
          dataSource={dataProjects}
          scroll={{ x: 1300 }}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                navigate(`/project-management/${record.key}`, {
                  state: record.key,
                });
              },
            };
          }}
        />
      </Col>
    </div>
  );
};
