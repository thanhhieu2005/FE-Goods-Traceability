import { Badge, Col } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import React, { useEffect, useState } from "react";
import "../common.scss";
import { FormOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { parseProductionData, Production } from "@/types/step_tracking";
import { BadgeByState } from "@/components/Tag/StateTag";
import { GetAllProduceAPI } from "@/api/produce_api";

// interface Produce {
//   key: string;
//   projectId: string;
//   projectCode: string;
//   totalInput?: number;
//   factory?: string;
//   produceName?: string;
//   inspector?: string;
//   dateCompleted?: string;
//   totalProduct?: number;
//   humidity?: number;
//   dryingTemperature?: number;
//   expiredDate?: string;
//   state: number;
// }

// const data: Production[] = [];

function ProduceManagement() {
  const navigate = useNavigate();

  const [dataProduction, setDataProduction] = useState<Production[]>([]);

  useEffect(() => {
    const fetchAPI = GetAllProduceAPI();

    fetchAPI.then((res: any) => {
      res?.data.map((element: any) => {
        const production = parseProductionData(element) as Production;
        setDataProduction((prevArr) => [...prevArr, production]);
      });
    });
  }, []);

  const columns: ColumnsType<Production> = [
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
    //         navigate("/produce-management/id");
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
        <div className="header-content">Production Management</div>
        <Table
          columns={columns}
          dataSource={dataProduction}
          scroll={{ x: 1300 }}
          onRow={(production, rowIndex) => {
            return {
              onClick: () => {
                navigate(`/produce-management/${production.productionId}`, {
                  state: production.productionId,
                });
              },
            };
          }}
        />
      </Col>
    </div>
  );
}

export default ProduceManagement;
