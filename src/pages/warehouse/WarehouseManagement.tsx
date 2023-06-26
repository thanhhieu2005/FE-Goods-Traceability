import WarehouseStorageServices, {
  GetAllWarehouseStorageAPI,
} from "@/api/warehouse_api";
import { BadgeByState, TagStateCommonProject } from "@/components/Tag/StateTag";
import {
  WarehouseStorageModel,
  parseWarehouseStorageData,
} from "@/types/step_tracking";
import { Col, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../common.scss";
import { UserDetailModel } from "@/types/user";
import { useSelector } from "react-redux";
import { dateFormat } from "@/utils/formatDateTime";
import moment from "moment";
import { CommonProjectState } from "@/types/project_model";
import Search from "antd/lib/input/Search";

function WarehouseManagement() {
  const navigate = useNavigate();

  const [dataWarehouseStorage, setDataWarehouseStorage] = useState<
    WarehouseStorageModel[]
  >([]);

  const currentUser: UserDetailModel = useSelector(
    (state: any) => state.authen.currentUserInfo
  );

  useEffect(() => {
    const getAllWarehouseProjectByUser = async () => {
      try {
        const res: any =
          await WarehouseStorageServices.getAllWarehouseProjectByUserId(
            currentUser.userId
          );

        const formatWarehouseStorage = [] as WarehouseStorageModel[];

        if (res.status === 200) {
          res.data.map((e: any) => {
            formatWarehouseStorage.push(parseWarehouseStorageData(e));
          });

          setDataWarehouseStorage(formatWarehouseStorage);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getAllWarehouseProjectByUser();
  }, [currentUser.userId]);

  const columns: ColumnsType<WarehouseStorageModel> = [
    {
      title: "Warehouse Storage ID",
      width: 100,
      dataIndex: "key",
      key: "warehouseStorageId",
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
      title: "Input Date",
      width: 100,
      dataIndex: "inputDate",
      key: "inputDate",
      fixed: "left",
      align: "center",
      render: (date: string) =>
        date !== null ? (
          <div>{moment(date).format(dateFormat)}</div>
        ) : (
          <div>Not Update</div>
        ),
    },
    {
      title: "Output Date",
      width: 100,
      dataIndex: "outputDate",
      key: "outputDate",
      fixed: "left",
      align: "center",
      render: (date: string) =>
        date !== null ? (
          <div>{moment(date).format(dateFormat)}</div>
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
            <div className="title-header">Warehouse Storage Projects</div>
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
            dataSource={dataWarehouseStorage}
            scroll={{ x: 1300 }}
            pagination={{ defaultPageSize: 10, showSizeChanger: true }}
            onRow={(warehouseStorage: WarehouseStorageModel) => {
              return {
                onClick: () => {
                  navigate(
                    `/warehouse-management/${warehouseStorage.warehouseStorageId}`,
                    { state: warehouseStorage.warehouseStorageId }
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

export default WarehouseManagement;
