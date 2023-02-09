import { Badge, Col } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import React from 'react';
import "../common.scss";
import { FormOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface WarehouseStorage {
    key: string;
    projectId: string;
    projectCode: string;
    totalInput?: number;
    warehouse?: string;
    inspector?: string;
    inputDate?: string;
    outputDate?: string;
    totalExport?: number;
    state: number;
}

const data: WarehouseStorage[] = [
    {
        key: '123',
        projectId: 'abc123',
        projectCode: 'xyz123',
        totalInput: 100,
        warehouse: 'NTH Warehouse',
        inspector: 'Tran Quoc Khanh',
        inputDate: '16/2/2023',
        outputDate: '20/2/2023',
        totalExport: 100,
        state: 1,
    }
];

function WarehouseManagement() {
    const navigate = useNavigate();

    const columns: ColumnsType<WarehouseStorage> = [
        {
            title: "Warehouse Storage ID",
            width: 100,
            dataIndex: 'key',
            key: 'warehouseStorageId',
            fixed: 'left',
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
        },{
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
              <div style={{cursor: "pointer"}}
                onClick={() => {
                    navigate("/warehouse-management/id");
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
            <div className='header-content'>Warehouse Management</div>
            <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />
        </Col>
    </div>
  )
}

export default WarehouseManagement