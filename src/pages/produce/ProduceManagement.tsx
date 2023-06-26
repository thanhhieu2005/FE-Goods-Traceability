import ProductionSupervisionServices from "@/api/produce_api";
import { BadgeByState, TagStateCommonProject } from "@/components/Tag/StateTag";
import { ProductionModel, parseProductionData } from "@/types/step_tracking";
import { UserDetailModel } from "@/types/user";
import { Col, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../common.scss";
import moment from "moment";
import { CommonProjectState } from "@/types/project_model";
import Search from "antd/lib/input/Search";

function ProduceManagement() {
  const navigate = useNavigate();

  const [dataProduction, setDataProduction] = useState<ProductionModel[]>([]);

  const currentUser: UserDetailModel = useSelector(
    (state: any) => state.authen.currentUserInfo
  );

  useEffect(() => {
    const getProductionProjectsByUser = async () => {
      try {
        const res: any =
          await ProductionSupervisionServices.getAllProductionSupervisionProjectsByUser(
            currentUser.userId
          );

        const formatProduction = [] as ProductionModel[];

        if (res.status === 200) {
          res.data.map((e: any) => {
            formatProduction.push(parseProductionData(e));
          });

          setDataProduction(formatProduction);
        }
      } catch (err) {
        //handle
      }
    };

    getProductionProjectsByUser();
  }, [currentUser.userId]);

  const columns: ColumnsType<ProductionModel> = [
    {
      title: "Harvest ID",
      width: 100,
      dataIndex: "key",
      key: "harvestId",
      fixed: "left",
      align: "center",
    },
    {
      title: "Project ID",
      width: 100,
      dataIndex: "projectId",
      key: "projectId",
      fixed: "left",
      align: "center",
      render: (projectId: string) =>
        projectId !== null ? <div>{projectId}</div> : <div>Not Assign</div>,
    },
    {
      title: "Project Code",
      width: 100,
      dataIndex: "projectCode",
      key: "projectCode",
      fixed: "left",
      align: "center",
      render: (projectCode: string) =>
        projectCode !== null && projectCode !== "" ? (
          <div>{projectCode}</div>
        ) : (
          <div>Not Assign</div>
        ),
    },
    {
      title: "Inspector",
      width: 100,
      dataIndex: "inspector",
      key: "inspector",
      fixed: "left",
      align: "center",
      render: (inspector: UserDetailModel) => <div>{inspector.email}</div>,
    },
    {
      title: "Date Completed",
      width: 100,
      dataIndex: "dateCompleted",
      key: "dateCompleted",
      fixed: "left",
      align: "center",
      render: (date: string) =>
        date !== null ? (
          <div>{moment(date).format("DD/MM/YYYY")}</div>
        ) : (
          <div>Not Update</div>
        ),
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

  return (
    <div>
      <Col>
        <div className="header-content">
          <Col>
            <div className="title-header">Your Harvest Projects</div>
            <div className="sub-title-header">
              List of projects that you are managing and assigned to perform
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
              <div className="label-search">Find project</div>
              <div className="search-item">
                <Search placeholder="Enter your project" enterButton />
              </div>
            </Row>
          </Row>
          <Table
            columns={columns}
            dataSource={dataProduction}
            scroll={{ x: 1300 }}
            pagination={{ defaultPageSize: 10, showSizeChanger: true }}
            onRow={(production: ProductionModel) => {
              return {
                onClick: () => {
                  navigate(
                    `/produce-management/${production.produceSupervisionId}`,
                    {
                      state: production.produceSupervisionId,
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
}

export default ProduceManagement;
