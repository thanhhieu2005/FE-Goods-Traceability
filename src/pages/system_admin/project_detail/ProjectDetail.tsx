import CheckProjectStatus from "@/pages/common/CheckProjectStatus";
import {
  FormOutlined,
} from "@ant-design/icons";
import { Badge, Button, Col, Form, Input, Row } from "antd";
import React, { useState } from "react";
import "../../common.scss";
import InfoHarvestModal from "./InfoHarvestModal";
import InfoProductionModal from "./InfoProductionModal";
import InfoTransportModal from "./InfoTransportModal";
import InfoWarehouseModal from "./InfoWarehouseModal";
import "./ProjectDetail.scss";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

let disabled = true;
const BatchDetail = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(disabled);

  return (
    <Col>
      <div className="header-content">Project Detail</div>
      <div className="content">
        <Col>
          <p className="title"> Project Information </p>
          <div className="btn-update">
            <Button
              type="primary"
              icon={<FormOutlined />}
              onClick={() => {
                disabled = false;
                setComponentDisabled(disabled);
              }}
            >
              Update
            </Button>
          </div>
          <div className="main-content">
            <Form {...layout} disabled={true}>
              <Form.Item label="Project ID" name="projectId">
                <Input />
              </Form.Item>
              <Form.Item label="Project Code" name="projectCode">
                <Input />
              </Form.Item>
            </Form>
            {/* Componet allow edit */}
            <Form {...layout} disabled={componentDisabled}>
              <Form.Item label="Project Name" name="projectName">
                <Input />
              </Form.Item>
            </Form>
            <Form {...layout} disabled={true}>
              <Form.Item label="Manager" name="manager">
                <Input />
              </Form.Item>
              <Form.Item label="Date Created" name="dateCreated">
                <Input />
              </Form.Item>
              <Form.Item label="Date Completed" name="dateCompleted">
                <Input />
              </Form.Item>

              {/* <Form.Item label="Farm Name" name="farm">
                <Input />
              </Form.Item>
              <Form.Item label="Farm Project" name="farmProject">
                <Input />
              </Form.Item> */}
            </Form>
            <Form {...layout}>
              <Form.Item label="Harvest Inspection" name="harvester">
                <Row>
                  {CheckProjectStatus(1)}
                  <div>
                    <InfoHarvestModal />
                  </div>
                </Row>
              </Form.Item>
              <Form.Item label="Transport Inspection" name="transport">
                <Row>
                  {CheckProjectStatus(4)}
                  <div>
                    <InfoTransportModal />
                  </div>
                </Row>
              </Form.Item>
              <Form.Item label="Warehouse Inspection" name="warehouseStorage">
                <Row>
                  {CheckProjectStatus(4)}
                  <div>
                    <InfoWarehouseModal />
                  </div>
                </Row>
              </Form.Item>
              <Form.Item label="Supervising Producer" name="produce">
                <Row>
                  {CheckProjectStatus(4)}
                  <div>
                    <InfoProductionModal />
                  </div>
                </Row>
              </Form.Item>
              <Form.Item label="Project Status" name="status">
                <Badge status="success" style={{ paddingRight: "4px" }} />
                Completed
              </Form.Item>
            </Form>
          </div>
          <div className="layout-btn-save">
            <Button
              className="btn-save"
              type="primary"
              // icon={<FormOutlined />}
              onClick={() => {
                disabled = true;
                setComponentDisabled(disabled);
              }}
              hidden={disabled}
              size={"large"}
            >
              Save
            </Button>
          </div>
        </Col>
      </div>
    </Col>
  );
};

export default BatchDetail;
