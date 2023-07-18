import React, { useEffect, useState } from "react";
import {  Button, Col, Row, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { GetAllProjectAPI } from "@/api/system_admin/project_api";
import moment from "moment";
import Search from "antd/lib/input/Search";
import { CommonProjectState } from "@/types/project_model";
import { TagStateCommonProject } from "@/components/Tag/StateTag";

interface ProjectInfo {
  key: string;
  projectCode: string;
  projectName: string;
  manager: string;
  dateCreated: string;
  status: number;
}

export const ProjectManagement = () => {
  const navigate = useNavigate();

  // const accountMetamask = useSelector((state: any) => state.account);

  // console.log(accountMetamask);

  const [dataProjects, setDataProjects] = useState<ProjectInfo[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAPI = GetAllProjectAPI();
    fetchAPI.then((res: any) => {
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

      setIsLoading(false);
    });
  }, []);

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
      render: (date: string) => <div>{moment(date).format("DD/MM/YYYY")}</div>,
    },
    {
      title: "Status",
      width: 100,
      dataIndex: "status",
      key: "status",
      fixed: "left",
      render: (state: CommonProjectState) => TagStateCommonProject(state),
    },
  ];

  const onSearch = (value: string) => {
    console.log(value);
  }

  return (
    <div>
      <Col>
        <div className="header-content">
          <Col>
            <div className="title-header">Project Management</div>
            <div className="sub-title-header">
              List of all projects of the enterprise being managing and
              following the process
            </div>
          </Col>
        </div>
        <div className="content-page">
          <Row
            style={{ paddingBottom: "12px", justifyContent: "space-between", alignItems: 'center'}}
          >
            <Row style={{ width: "80%" }}>
              <div className="label-search">Find project</div>
              <div className="search-item">
                <Search placeholder="Enter your project" enterButton onSearch={onSearch}/>
              </div>
            </Row>
            <div className="action-layout-btn">
              {/* <CreateProjectForm /> */}
              <Button
                type="primary"
                onClick={() => navigate(`/create-new-project`)}
                icon={<PlusOutlined />}
              >
                Create new Project
              </Button>
            </div>
          </Row>
          <Table
            columns={columns}
            dataSource={dataProjects}
            loading={isLoading}
            scroll={{ x: 1300 }}
            pagination={{ defaultPageSize: 10, showSizeChanger: true }}
            onRow={(record: ProjectInfo) => {
              return {
                onClick: () => {
                  navigate(`/project-management/${record.key}`, {
                    state: record.key,
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
