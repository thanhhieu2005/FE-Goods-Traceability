import HarvestServices from "@/api/harvest/harvest_api";
import { TagStateCommonProject } from "@/components/Tag/StateTag";
import { CommonProjectState } from "@/types/project_model";
import { HarvestModel, parseHarvestData } from "@/types/step_tracking";
import { UserDetailModel } from "@/types/user";
import { Col, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Search from "antd/lib/input/Search";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../common.scss";

const HarvestManagement = () => {
  const navigate = useNavigate();

  const [dataHarvests, setDataHarvests] = useState<HarvestModel[]>([]);

  const currentUser: UserDetailModel = useSelector(
    (state: any) => state.authen.currentUserInfo
  );

  useEffect(() => {
    const getHarvestProjectByUser = async () => {
      try {
        const res: any = await HarvestServices.getAllHarvestByID(
          currentUser.userId
        );

        const formatHarvest = [] as HarvestModel[];

        if (res.status === 200) {
          res.data.map((e: any) => {
            formatHarvest.push(parseHarvestData(e));
            console.log(formatHarvest);
          });

          setDataHarvests(formatHarvest);
        }
      } catch (err) {
        // handle err
      }
    };

    getHarvestProjectByUser();
  }, [currentUser.userId]);

  const columns: ColumnsType<HarvestModel> = [
    {
      title: "Harvest ID",
      width: 100,
      dataIndex: "harvestId",
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
      render: (projectId: string) => projectId !== null ? <div>{projectId}</div> : <div>Not Assign</div>
    },
    {
      title: "Project Code",
      width: 100,
      dataIndex: "projectCode",
      key: "projectCode",
      fixed: "left",
      align: "center",
      render: (projectCode: string) => projectCode !== null && projectCode !== "" ? <div>{projectCode}</div> : <div>Not Assign</div>
    },
    {
      title: "Inspector",
      width: 100,
      dataIndex: "inspector",
      key: "inspector",
      fixed: "left",
      align: "center",
      render: (inspector: UserDetailModel) => (
        <div>{inspector.email}</div>
      )
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
      align: 'center',
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
            dataSource={dataHarvests}
            scroll={{ x: 1300 }}
            pagination={{ defaultPageSize: 10, showSizeChanger: true }}
            onRow={(harvest: HarvestModel) => {
              return {
                onClick: () => {
                  navigate(`/harvest-management/${harvest.harvestId}`, {
                    state: harvest.harvestId,
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

export default HarvestManagement;
