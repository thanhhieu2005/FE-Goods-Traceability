import FarmServices from "@/api/farm/farm_api";
import { TagStateCommonProject } from "@/components/Tag/StateTag";
import { FarmProjectModel, ProjectInFarmProjectModel } from "@/types/farm_model";
import { CommonProjectState } from "@/types/project_model";
import { UserDetailModel } from "@/types/user";
import { Button, Col, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Search from "antd/lib/input/Search";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const columns: ColumnsType<FarmProjectModel> = [
  {
    title: "Farm Project ID",
    width: 100,
    dataIndex: "farmProjectId",
    key: "farmProjectId",
    fixed: "left",
    align: "center",
  },
  {
    title: "Farm Project Code",
    width: 100,
    dataIndex: "farmProjectCode",
    key: "farmProjectCode",
    fixed: "left",
    align: "center",
  },
  {
    title: "Project Code",
    width: 100,
    dataIndex: "projectId",
    key: "projectId",
    fixed: "left",
    align: "center",
    render: (projectId: ProjectInFarmProjectModel) =>
      projectId === null ? (
        <div style={{ color: "red" }}>Has not been Assigned</div>
      ) : (
        <div>{projectId.projectCode}</div>
      ),
  },
  {
    title: "Farmer",
    width: 100,
    dataIndex: "farmer",
    key: "farmer",
    fixed: "left",
    align: "center",
    render: (farmer: UserDetailModel) =>
      farmer === null ? (
        <div style={{color: 'red'}}>
          Not farmer yet
        </div>
      ) : (
        <div>
          {" "}
          {farmer === null ? "" : farmer.lastName + " " + farmer.firstName}{" "}
        </div>
      ),
  },
  {
    title: "Date Created",
    width: 100,
    dataIndex: "dateCreated",
    key: "dateCreated",
    fixed: "left",
    align: "center",
    render: (date: string) => <div>{moment(date).format("DD/MM/YYYY")}</div>,
  },
  {
    title: "State",
    width: 100,
    dataIndex: "state",
    key: "state",
    fixed: "left",
    align: "center",
    render: (state: CommonProjectState) => TagStateCommonProject(state),
  },
];

const FarmProjectManagement = () => {
  const navigate = useNavigate();

  const [dataFarmProjects, setDataFarmProjects] = useState<FarmProjectModel[]>(
    []
  );

  const farmId = useSelector(
    (state: any) => state.authen.currentUserInfo.farmId
  );

  console.log(farmId);

  useEffect(() => {
    FarmServices.getAllFarmProjectsService(farmId).then((res: any) => {
      if (res?.status === 200) {
        res.data.map((element: any) => {
          const farmProject = element as FarmProjectModel;
          setDataFarmProjects((prevFarmProject) => [
            ...prevFarmProject,
            farmProject,
          ]);
        });
      }
    });
  }, [setDataFarmProjects]);

  return (
    <div>
      <Col>
        <div className="header-content">
          <Col>
            <div className="title-header">Farm Project Management</div>
            <div className="sub-title-header">
              Display the list of farm projects in your farm
            </div>
          </Col>
        </div>
        <div className="content-page">
          <Row
            style={{ paddingBottom: "12px", justifyContent: "space-between" }}
          >
            <Row style={{ width: "80%" }}>
              <div className="label-search">Find farm project</div>
              <div className="search-item">
                <Search placeholder="Enter your farm project" enterButton />
              </div>
            </Row>
            <div className="action-layout-btn">
              <Button type="primary" onClick={() => {navigate(`/farm-project-management/create-farm-project`)}}>Create new Project</Button>
            </div>
          </Row>
          <Table
            columns={columns}
            dataSource={dataFarmProjects}
            scroll={{ x: 1300 }}
            pagination={{ defaultPageSize: 10, showSizeChanger: true}}
            onRow={(farmProject: any, rowIndex: any) => {
              return {
                onClick: () => {
                  navigate(
                    `/farm-project-management/${farmProject.farmProjectId}`,
                    {
                      state: farmProject,
                    }
                  );
                },
              };
            }}
          />
        </div>
      </Col>
    </div>
  );
};

export default FarmProjectManagement;
