import { FormOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Badge, Button, Col, Form, Input } from "antd";
import "../common.scss";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

let disabled = true;

const HarvestDetail = () => {

  const [componentDisabled, setComponentDisabled] = useState<boolean>(disabled);

  return (
    <Col>
      <div className="header-content">Harvest Detail</div>
      <div className="content">
        <Col>
          <p className="title">Harvest Information</p>
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
              <Form.Item label="Harvest ID" name="harvestId">
                <Input />
              </Form.Item>
              <Form.Item label="Project ID" name="projectId">
                <Input />
              </Form.Item>
              <Form.Item label="Project Code" name="projectCode">
                <Input />
              </Form.Item>
            </Form>
            <Form {...layout} disabled={componentDisabled}>
              <Form.Item label="Total Harvest" name="totalHarvest">
                <Input />
              </Form.Item>
              <Form.Item label="Ripeness" name="ripeness">
                <Input type="number" />
              </Form.Item>
              <Form.Item label="Temperature" name="temperature">
                <Input type="number" />
              </Form.Item>
              <Form.Item label="Moisture" name="moisture">
                <Input type="number" />
              </Form.Item>
            </Form>
            <Form {...layout} disabled={true}>
              <Form.Item label="Inspector" name="inspector">
                <Input />
              </Form.Item>
              <Form.Item label="Date Completed" name="dateCompleted">
                <Input />
              </Form.Item>
            </Form>
            <Form {...layout} disabled={componentDisabled}>
              <Form.Item label="State" name="state">
                <Badge status="success" style={{ paddingRight: "4px" }} />
                Completed
              </Form.Item>
            </Form>
          </div>
          <div className="layout-btn-save">
            <Button
            className="btn-save"
              type="primary"
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

export default HarvestDetail;
