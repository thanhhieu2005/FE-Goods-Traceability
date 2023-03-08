import { Badge, Col } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllTransportAPI } from "@/api/transport_api";
import { parseTransportData } from "@/utils/parseData";
import { Transport } from "@/types/step_tracking";
import { BadgeByState } from "@/components/Tag/StateTag";

const TransportManagement = () => {
  const navigate = useNavigate();

  const [dataTransport, setDataTransport] = useState<Transport[]>([]);

  useEffect(() => {
    const fetchAPI = GetAllTransportAPI();

    fetchAPI.then((res: any) => {
      res?.data.map((element: any) => {
        const transport = parseTransportData(element) as Transport;
        setDataTransport((prevArr) => [...prevArr, transport]);
      });
    });
  }, []);

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
      render: (value: number) => BadgeByState(value),
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
    //         navigate("/transport-management/id");
    //       }}
    //     >
    //       <FormOutlined />
    //     </div>
    //   ),
    // },
  ];
  return (
    <Col>
      <div className="header-content">Transport Management</div>
      <Table
        columns={columns}
        dataSource={dataTransport}
        scroll={{ x: 1300 }}
        onRow={(transport, rowIndex) => {
          return {
            onClick: () => {
              navigate(`/transport-management/${transport.transportId}`, {
                state: transport.transportId,
              });
            },
          };
        }}
      />
    </Col>
  );
};

export default TransportManagement;
