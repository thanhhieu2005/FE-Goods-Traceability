import { Badge, Col, Table } from "antd";
import React, { useEffect, useState } from "react";
import "../common.scss";
import { FormOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { parseWarehouseStorageData, WarehouseStorage } from "@/types/step_tracking";
import { GetAllWarehouseStorageAPI } from "@/api/warehouse_api";
import { BadgeByState } from "@/components/Tag/StateTag";
import { ColumnsType } from "antd/es/table";


function WarehouseManagement() {
  const navigate = useNavigate();

  const [dataWarehouseStorage, setDataWarehouseStorage] = useState<
    WarehouseStorage[]
  >([]);

  useEffect(() => {
    const fetchAPI = GetAllWarehouseStorageAPI();

    fetchAPI.then((res: any) => {
      res?.data.map((element: any) => {
        const transport = parseWarehouseStorageData(
          element
        ) as WarehouseStorage;
        setDataWarehouseStorage((prevArr) => [...prevArr, transport]);
      });
    });
  }, []);

  const columns: ColumnsType<WarehouseStorage> = [
    {
      title: "Warehouse Storage ID",
      width: 100,
      dataIndex: "key",
      key: "warehouseStorageId",
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
      title: "Output Date",
      width: 100,
      dataIndex: "outputDate",
      key: "outputDate",
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
    //         navigate("/warehouse-management/id");
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
        <div className="header-content">Warehouse Management</div>
        <Table
          columns={columns}
          dataSource={dataWarehouseStorage}
          scroll={{ x: 1300 }}
          pagination={{ defaultPageSize: 10, showSizeChanger: true}}
          onRow={(warehouseStorage : WarehouseStorage, rowIndex : any) => {
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
      </Col>
    </div>
  );
}

export default WarehouseManagement;
