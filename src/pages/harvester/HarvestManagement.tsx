import { Badge, Col, Table } from "antd";
import React, { useEffect, useState } from "react";
import "../common.scss";
import { FormOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Harvest, parseHarvestData } from "@/types/step_tracking";
import { GetAllHarvestAPI } from "@/api/harvest/harvest_api";
import { ColumnsType } from "antd/es/table";

const HarvestManagement = () => {
  const navigate = useNavigate();

  const [dataHarvests, setDataHarvests] = useState<Harvest[]>([]);

  useEffect(() => {
    const fetchAPI = GetAllHarvestAPI();
    
    fetchAPI.then((res: any) => {
      console.log("res: ", res);
      res?.data.map((element: any) => {
        const newHarvest = parseHarvestData(element);
        setDataHarvests((prevArr) => [...prevArr, newHarvest]);
      });
    });
  }, []);

  console.log(dataHarvests);

  const columns: ColumnsType<Harvest> = [
    {
      title: "Harvest ID",
      width: 100,
      dataIndex: "key",
      key: "harvestId",
      fixed: "left",
    },
    {
      title: "Project ID",
      width: 100,
      dataIndex: "projectId",
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
      title: "Inspector",
      width: 100,
      dataIndex: "inspector",
      key: "inspector",
      fixed: "left",
    },
    {
      title: "Date Completed",
      width: 100,
      dataIndex: "dateCompleted",
      key: "dateCompleted",
      fixed: "left",
    },
    {
      title: "State",
      width: 100,
      dataIndex: "state",
      key: "state",
      fixed: "left",
      render: (value: number) =>
        value == 1 ? (
          <span>
            <Badge
              status="processing"
              style={{ paddingRight: "4px" }}
            />
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
    //         navigate("/harvest-management/id");
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
        <div className="header-content">Harvest Management</div>
        <Table columns={columns} dataSource={dataHarvests} scroll={{ x: 1300 }} pagination={{ defaultPageSize: 10, showSizeChanger: true}} onRow = {(harvest : Harvest, rowIndex : any) => {
          return {
            onClick: () => {
              navigate(`/harvest-management/${harvest.harvestId}`, {state: harvest.harvestId})
            }
          }
        }} />
      </Col>
    </div>
  );
};

export default HarvestManagement;
