import { Badge, Col } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import React from 'react';
import "../common.scss";
import { FormOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface Harvest {
    key: string;
    projectId: string;
    projectCode: string;
    totalHarvest?: number;
    ripness?: number;
    temperature?: number;
    moisture?: number;
    inspector: string;
    dateCompleted?: string;
    state: number;
}

const data: Harvest[] = [
    {
        key: '1234',
        projectId: 'abc123',
        projectCode: 'xyz123',
        totalHarvest: 100,
        ripness: 10,
        temperature: 20,
        moisture: 0.1,
        inspector: "Tran Quoc Khanh",
        dateCompleted: '29/2/2023',
        state: 1,
    }
];

const HarvestManagement = () => {
    const navigate = useNavigate();

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
                    navigate("/harvest-management/id");
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
            <div className='header-content'>Harvest Management</div>
            <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />
        </Col>
    </div>
  )
}

export default HarvestManagement