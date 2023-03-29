import React, { useEffect, useState } from "react";
import { Badge, Col, Row, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FormOutlined } from "@ant-design/icons";
import "../../common.scss";
import CreateFarmForm from "./CreateFarmForm";
import { FarmInfo } from "@/types/farm";
import { useNavigate } from "react-router-dom";
import FarmManagementService from "@/api/admin_tech/farm_management_services";
import { parseFarmInfo } from "@/utils/models/farm_model";
import Search from "antd/lib/input/Search";

const columns: ColumnsType<FarmInfo> = [
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
    render: (value: number) =>
      value == 1 ? (
        <span>
          <Badge status="success" style={{paddingRight: '4px'}} />
          Actived
        </span>
      ) : value == 2 ? (
        <span>
          <Badge status="processing" color="yellow" style={{paddingRight: '4px'}} />
          Not Actived
        </span>
      ) : (
        <span>
          <Badge status="error" style={{paddingRight: '4px'}} />
          Revoked
        </span>
      ),
  },
];

export const TechAdminFarm = () => {
  const navigate = useNavigate();

  const [dataListFarms, setDataListFarms] = useState<FarmInfo[]>([]);

  useEffect(() => {
    FarmManagementService.getAllFarmService().then((res: any) => {
      if(res?.status === 200) {
        console.log(res.data);
        res.data.map((element: any) => {
          const farmInfo = parseFarmInfo(element) as FarmInfo;
          setDataListFarms((prev) => [...prev, farmInfo]);
        })
      }
    });
  }, []);

  return (
    <div>
      <Col>
        <div className="header-content">
          <Col>
            <div className="title-header">
              Farm Management
            </div>
            <div className="sub-title-header">
              Manage the list of farms in the system controlled by the Technical Administrator
            </div>
          </Col>
        </div>
        <div className="content-page">
          <Col>
          <Row style={{paddingBottom: '12px', justifyContent: 'space-between'}}>
              <Row style={{width:'80%'}}>
                <div className="label-search">
                  Find farm
                </div>
                <div className="search-item">
                  <Search placeholder="Enter your farm code" enterButton/>
                </div>
              </Row>
              <div className="action-layout-btn">
              <CreateFarmForm></CreateFarmForm>
              </div>
            </Row>
            <Table 
              columns={columns} 
              dataSource={dataListFarms} 
              scroll={{ x: 1300 }} 
              onRow={(farm, rowIndex) => {
                return {
                  onClick: () => {
                    navigate(`/techAd-farm-management/${farm.farmId}`, {
                      state: farm.farmId,
                    })
                  }
                }
              }}
            />
          </Col>
        </div>
      </Col>
    </div>
  );
};
