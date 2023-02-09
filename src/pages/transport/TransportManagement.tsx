import { Badge, Col } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import React from "react";
import { FormOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface Transport {
  key: string;
  projectId: string;
  projectCode: string;
  totalInput?: number;
  transportName?: string;
  inspector: string;
  vehicle?: string;
  numberVehicles?: number;
  dateExpected?: string;
  dateCompleted?: string;
  state: number;
}

const data: Transport[] = [
  {
    key: "12345",
    projectId: "abc123",
    projectCode: "xyz123",
    totalInput: 100,
    transportName: "NTH company",
    inspector: "Tran Quoc Khanh",
    vehicle: "Xe tai",
    numberVehicles: 20,
    dateExpected: "3/3/2023",
    dateCompleted: "",
    state: 1,
  },
];

const TransportManagement = () => {
  const navigate = useNavigate();
  const columns: ColumnsType<Transport> = [
    {
      title: "Transport ID",
      width: 100,
      dataIndex: "key",
      key: "transportId",
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
            navigate("/transport-management/id");
          }}
        >
          <FormOutlined />
        </div>
      ),
    },
  ];
  return (
    <Col>
      <div className="header-content">Transport Management</div>
      <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />
    </Col>
  );
};

export default TransportManagement;
