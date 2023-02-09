import { Badge, Col } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import React from "react";
import "../common.scss";
import { FormOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface Produce {
  key: string;
  projectId: string;
  projectCode: string;
  totalInput?: number;
  factory?: string;
  produceName?: string;
  inspector?: string;
  dateCompleted?: string;
  totalProduct?: number;
  humidity?: number;
  dryingTemperature?: number;
  expiredDate?: string;
  state: number;
}

const data: Produce[] = [
  {
    key: "123",
    projectId: "abc123",
    projectCode: "xyz123",
    totalInput: 100,
    factory: "NTH Production",
    produceName: "NTH Coffee",
    inspector: "Tran Quoc Khanh",
    dateCompleted: "1/9/2023",
    totalProduct: 20,
    humidity: 10,
    dryingTemperature: 80,
    expiredDate: "1/9/2024",
    state: 1,
  },
];

function ProduceManagement() {
  const navigate = useNavigate();

  const columns: ColumnsType<Produce> = [
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
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/produce-management/id");
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
        <div className="header-content">Production Management</div>
        <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />
      </Col>
    </div>
  );
}

export default ProduceManagement;
