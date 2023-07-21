import React, { useEffect, useState } from "react";
import { Badge, Col, Row, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FormOutlined } from "@ant-design/icons";
import "../../common.scss";
import CreateFarmForm from "./CreateFarmForm";
import { FarmInfoModel, parseFarmInfo, StatusFarm } from "@/types/farm_model";
import { useNavigate } from "react-router-dom";
import FarmManagementService from "@/api/admin_tech/farm_management_services";
import Search from "antd/lib/input/Search";

const columns: ColumnsType<FarmInfoModel> = [
  {
    title: "Farm ID",
    width: 100,
    dataIndex: "farmId",
    key: "farmId",
    fixed: "left",
    align: "center",
  },
  {
    title: "Code",
    width: 100,
    dataIndex: "farmCode",
    key: "farmCode",
    fixed: "left",
    align: "center",
  },
  {
    title: "Name",
    width: 100,
    dataIndex: "farmName",
    key: "farmName",
    fixed: "left",
    align: "center",
  },
  {
    title: "Owner",
    width: 100,
    dataIndex: "farmOwner",
    key: "owner",
    fixed: "left",
    align: "center",
  },
  {
    title: "Address",
    width: 100,
    dataIndex: "farmAddress",
    key: "farmAddress",
    fixed: "left",
    align: "center",
  },
  {
    title: "Phone Number",
    width: 100,
    dataIndex: "farmPhoneNumber",
    key: "phoneNumber",
    fixed: "left",
    align: "center",
  },
  {
    title: "Status",
    width: 100,
    dataIndex: "statusFarm",
    key: "state",
    fixed: "left",
    align: "center",
    render: (value: StatusFarm) =>
      value == StatusFarm.Actived ? (
        <span>
          <Badge status="success" style={{ paddingRight: "4px" }} />
          Actived
        </span>
      ) : value == StatusFarm.NotActive ? (
        <span>
          <Badge
            status="processing"
            color="yellow"
            style={{ paddingRight: "4px" }}
          />
          Not Actived
        </span>
      ) : (
        <span>
          <Badge status="error" style={{ paddingRight: "4px" }} />
          Revoked
        </span>
      ),
  },
];

export const TechAdminFarm = () => {
  const navigate = useNavigate();

  const [dataListFarms, setDataListFarms] = useState<FarmInfoModel[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [isCall, setIsCall] = useState(false);

  useEffect(() => {
    FarmManagementService.getAllFarmService().then((res: any) => {
      if (res?.status === 200) {
        console.log(res.data);
        res.data.map((element: any) => {
          const farmInfo = parseFarmInfo(element) as FarmInfoModel;
          setDataListFarms((prev) => [...prev, farmInfo]);
        });
      }
      setIsLoading(false);
    });
  }, [isCall]);

  return (
    <div>
      <Col>
        <div className="header-content">
          <Col>
            <div className="title-header">Farm Management</div>
            <div className="sub-title-header">
              Manage the list of farms in the system controlled by the Technical
              Administrator
            </div>
          </Col>
        </div>
        <div className="content-page">
          <Col>
            <Row
              style={{
                paddingBottom: "12px",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Row style={{ width: "80%" }}>
                <div className="label-search">Find farm</div>
                <div className="search-item">
                  <Search placeholder="Enter your farm code" enterButton />
                </div>
              </Row>
              <div className="action-layout-btn">
                <CreateFarmForm
                  myProps={{ isCall: isCall, setIsCall: setIsCall }}
                />
              </div>
            </Row>
            <Table
              columns={columns}
              dataSource={dataListFarms}
              loading={isLoading}
              scroll={{ x: 1300 }}
              pagination={{ defaultPageSize: 10, showSizeChanger: true }}
              onRow={(farm: FarmInfoModel) => {
                return {
                  onClick: () => {
                    navigate(`/techAd-farm-management/${farm.farmId}`, {
                      state: farm.farmId,
                    });
                  },
                };
              }}
            />
          </Col>
        </div>
      </Col>
    </div>
  );
};
